"use client";

import { useActionState, useId } from "react";
import { CircleCheck, CircleAlert, Send } from "lucide-react";
import { sendRequest, type RequestState } from "@/app/actions";
import { site } from "@/lib/site";

type Topic = "service" | "propane" | "heating-oil" | "contact";

const initial: RequestState = { status: "idle" };

const inputClass =
  "mt-1.5 block w-full rounded-md border-0 bg-white px-3.5 py-3 text-ink ring-1 ring-ink/15 placeholder:text-asphalt/60 focus:ring-2 focus:ring-canopy focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600";

export function RequestForm({ topic, submitLabel = "Send request" }: { topic: Topic; submitLabel?: string }) {
  const [state, action, pending] = useActionState(sendRequest, initial);
  const id = useId();
  const f = (name: string) => `${id}-${name}`;
  const v = (name: string) => state.values?.[name] ?? "";
  // "Send message" becomes "Message sent", so the confirmation matches the button.
  const sentHeading = submitLabel.replace(/^Send (\w)(\w*)/, (_, a: string, b: string) => `${a.toUpperCase()}${b} sent`);

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-xl bg-white p-8 ring-1 ring-line">
        <CircleCheck className="size-8 text-diesel" aria-hidden />
        <p className="mt-4 font-display text-3xl font-semibold">{sentHeading}</p>
        <p className="mt-2 text-lg text-asphalt">{state.message}</p>
        <p className="mt-4 text-asphalt">
          In a hurry? Call{" "}
          <a href={site.phoneHref} className="font-semibold text-canopy underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <form key={state.attempt ?? 0} action={action} className="rounded-xl bg-white p-6 ring-1 ring-line sm:p-8" noValidate>
      <input type="hidden" name="topic" value={topic} />
      <div className="hidden" aria-hidden>
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="mb-6 flex gap-2.5 rounded-md bg-red-50 p-3.5 text-red-800">
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={f("name")} label="Your name" error={err.name}>
          <input id={f("name")} name="name" defaultValue={v("name")} autoComplete="name" required className={inputClass} aria-invalid={!!err.name} aria-describedby={err.name ? `${f("name")}-err` : undefined} />
        </Field>
        <Field id={f("phone")} label="Phone" error={err.phone}>
          <input id={f("phone")} name="phone" defaultValue={v("phone")} type="tel" autoComplete="tel" required className={inputClass} aria-invalid={!!err.phone} aria-describedby={err.phone ? `${f("phone")}-err` : undefined} />
        </Field>
        <Field id={f("email")} label="Email" optional error={err.email} className="sm:col-span-2">
          <input id={f("email")} name="email" defaultValue={v("email")} type="email" autoComplete="email" className={inputClass} aria-invalid={!!err.email} aria-describedby={err.email ? `${f("email")}-err` : undefined} />
        </Field>

        {topic === "service" && (
          <>
            <Field id={f("vehicle")} label="Vehicle" hint="Year, make and model">
              <input id={f("vehicle")} name="vehicle" defaultValue={v("vehicle")} placeholder="2016 Ford F-150" className={inputClass} />
            </Field>
            <Field id={f("service")} label="What do you need?">
              <select id={f("service")} name="service" className={inputClass} defaultValue={v("service")}>
                <option value="" disabled>
                  Choose one
                </option>
                <option>Oil change</option>
                <option>NC state inspection</option>
                <option>Tires</option>
                <option>Wheel alignment</option>
                <option>Engine or check engine light</option>
                <option>Transmission or clutch</option>
                <option>Something else</option>
              </select>
            </Field>
            <Field id={f("preferredDay")} label="Best day to bring it in" optional className="sm:col-span-2">
              <input id={f("preferredDay")} name="preferredDay" defaultValue={v("preferredDay")} placeholder="Tuesday morning" className={inputClass} />
            </Field>
          </>
        )}

        {topic === "propane" && (
          <>
            <Field id={f("propaneNeed")} label="What do you need?">
              <select id={f("propaneNeed")} name="propaneNeed" className={inputClass} defaultValue={v("propaneNeed")}>
                <option value="" disabled>
                  Choose one
                </option>
                <option>Delivery to my home tank</option>
                <option>New tank setup</option>
                <option>A price quote</option>
                <option>Something else</option>
              </select>
            </Field>
            <Field id={f("tankSize")} label="Tank size" optional>
              <input id={f("tankSize")} name="tankSize" defaultValue={v("tankSize")} placeholder="250 gallon, not sure…" className={inputClass} />
            </Field>
            <Field id={f("address")} label="Delivery address" className="sm:col-span-2">
              <input id={f("address")} name="address" defaultValue={v("address")} autoComplete="street-address" className={inputClass} />
            </Field>
          </>
        )}

        {topic === "heating-oil" && (
          <>
            <Field id={f("gallons")} label="How much?">
              <select id={f("gallons")} name="gallons" className={inputClass} defaultValue={v("gallons")}>
                <option value="" disabled>
                  Choose one
                </option>
                <option>100 gallons</option>
                <option>150 gallons</option>
                <option>200 gallons</option>
                <option>Fill it up</option>
              </select>
            </Field>
            <Field id={f("tankLevel")} label="Tank gauge reading" optional>
              <select id={f("tankLevel")} name="tankLevel" className={inputClass} defaultValue={v("tankLevel")}>
                <option value="">Not sure</option>
                <option>Empty or almost empty</option>
                <option>About 1/4</option>
                <option>About 1/2</option>
                <option>3/4 or more</option>
              </select>
            </Field>
            <Field id={f("address")} label="Delivery address" className="sm:col-span-2">
              <input id={f("address")} name="address" defaultValue={v("address")} autoComplete="street-address" className={inputClass} />
            </Field>
          </>
        )}

        <Field id={f("message")} label={topic === "contact" ? "How can we help?" : "Anything else we should know?"} optional={topic !== "contact"} className="sm:col-span-2">
          <textarea id={f("message")} name="message" defaultValue={v("message")} rows={4} className={inputClass} />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-asphalt">We’ll call you back during business hours.</p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-canopy px-6 py-3 font-semibold text-white transition-colors hover:bg-canopy-dark disabled:opacity-60"
        >
          <Send className="size-4" aria-hidden />
          {pending ? "Sending…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-asphalt"> (optional)</span>}
        {hint && <span className="block text-sm font-normal text-asphalt">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
