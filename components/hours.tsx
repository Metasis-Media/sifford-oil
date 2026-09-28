"use client";

import { useSyncExternalStore } from "react";
import { formatTime, hours, timeZone } from "@/lib/site";

// Current minute, client-only. Returns null during SSR so markup never mismatches.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

function useNowMinute() {
  return useSyncExternalStore(subscribe, getMinute, getServerMinute);
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function localParts(minute: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(minute * 60_000));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function getServiceStatus(minute: number) {
  const { day, minutes } = localParts(minute);
  const today = hours[day].hours;

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, text: `Service center open until ${formatTime(today.close)}` };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, text: `Service center opens at ${formatTime(today.open)} today` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7];
    if (next.hours) {
      const when = i === 1 ? "tomorrow" : next.day;
      return { open: false, text: `Service center opens ${when} at ${formatTime(next.hours.open)}` };
    }
  }
  return { open: false, text: "Service center closed" };
}

export function OpenStatus({ className = "" }: { className?: string }) {
  const minute = useNowMinute();
  const status = minute === null ? null : getServiceStatus(minute);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-live="polite">
      <span
        aria-hidden
        className={`size-2.5 rounded-full ${
          status === null ? "bg-white/40" : status.open ? "bg-[#4ade80] shadow-[0_0_0_4px_rgb(74_222_128/0.25)]" : "bg-white/50"
        }`}
      />
      {status?.text ?? "Service center Mon–Fri 7–6, Sat 7–1"}
    </span>
  );
}

export function HoursTable({ className = "" }: { className?: string }) {
  const minute = useNowMinute();
  const today = minute === null ? -1 : localParts(minute).day;
  // Start the week on Monday, the way people read shop hours.
  const ordered = [...hours.slice(1), hours[0]];

  return (
    <table className={`w-full text-left ${className}`}>
      <caption className="sr-only">Service center hours</caption>
      <tbody>
        {ordered.map((d) => {
          const isToday = hours.indexOf(d) === today;
          return (
            <tr
              key={d.day}
              className={`border-b border-line last:border-0 ${isToday ? "font-semibold text-ink" : "text-asphalt"}`}
            >
              <th scope="row" className="py-2.5 pr-4 font-medium">
                {d.day}
                {isToday && <span className="ml-2 text-sm font-medium text-canopy">Today</span>}
              </th>
              <td className="py-2.5 text-right tabular-nums">
                {d.hours ? `${formatTime(d.hours.open)} – ${formatTime(d.hours.close)}` : "Closed"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
