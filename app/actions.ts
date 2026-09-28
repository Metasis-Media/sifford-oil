"use server";

import { site } from "@/lib/site";

export type RequestState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "email", string>>;
  /** Echoed back on error so the form can refill what the customer typed. */
  values?: Record<string, string>;
  /** Bumped on every submit so the form remounts with the echoed values (selects ignore defaultValue updates). */
  attempt?: number;
};

const TOPICS = {
  service: "Service appointment request",
  propane: "Propane request",
  "heating-oil": "Heating oil delivery request",
  contact: "Website message",
} as const;

type Topic = keyof typeof TOPICS;

// Human labels for the optional fields each form can send.
const FIELD_LABELS: Record<string, string> = {
  vehicle: "Vehicle",
  service: "Service needed",
  preferredDay: "Preferred day",
  address: "Delivery address",
  propaneNeed: "Propane need",
  tankSize: "Tank size",
  gallons: "Amount",
  tankLevel: "Tank gauge reading",
  message: "Notes",
};

const clean = (v: FormDataEntryValue | null, max = 500) =>
  typeof v === "string" ? v.replace(/\s+\n/g, "\n").trim().slice(0, max) : "";

export async function sendRequest(prev: RequestState, formData: FormData): Promise<RequestState> {
  const attempt = (prev.attempt ?? 0) + 1;
  // Bots fill every field, people never see this one.
  if (clean(formData.get("company"))) return { status: "sent", message: "Thanks. We got your request." };

  const topicRaw = clean(formData.get("topic"), 40);
  const topic: Topic = topicRaw in TOPICS ? (topicRaw as Topic) : "contact";
  const name = clean(formData.get("name"), 100);
  const phone = clean(formData.get("phone"), 30);
  const email = clean(formData.get("email"), 200);

  const fieldErrors: RequestState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Enter your name.";
  if (phone.replace(/\D/g, "").length < 10) fieldErrors.phone = "Enter a 10-digit phone number so we can call you back.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Check the email address, or leave it blank.";
  const values = Object.fromEntries(
    ["name", "phone", "email", ...Object.keys(FIELD_LABELS)].map((k) => [k, clean(formData.get(k), 2000)]),
  );

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Check the highlighted fields and send again.", fieldErrors, values, attempt };
  }

  const details = Object.entries(FIELD_LABELS)
    .map(([key, label]) => [label, clean(formData.get(key), key === "message" ? 2000 : 300)] as const)
    .filter(([, value]) => value);

  const text = [
    `${TOPICS[topic]} from ${site.url}`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    ...(email ? [`Email: ${email}`] : []),
    ...details.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[request form] Email not configured, logging instead:\n" + text);
      return { status: "sent", message: sentMessage(name) };
    }
    return {
      status: "error",
      message: `Online requests aren’t switched on yet. Call us at ${site.phone} and we’ll take care of it.`,
      values,
      attempt,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Sifford Oil Website <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: email || undefined,
        subject: `${TOPICS[topic]}: ${name}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  } catch (err) {
    console.error("[request form] Failed to send", err);
    return {
      status: "error",
      message: `Your request didn’t go through. Try again, or call us at ${site.phone}.`,
      values,
      attempt,
    };
  }

  return { status: "sent", message: sentMessage(name) };
}

function sentMessage(name: string) {
  const first = name.split(" ")[0];
  return `Thanks, ${first}. We’ll call you back during business hours.`;
}
