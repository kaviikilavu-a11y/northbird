"use client";

import { useEffect, useState } from "react";

// Kenya runs a fixed UTC+3 offset year-round — no daylight saving to account for.
const NAIROBI_OFFSET_HOURS = 3;

function nairobiHour(): number {
  const now = new Date();
  const utcHour = now.getUTCHours();
  return (utcHour + NAIROBI_OFFSET_HOURS) % 24;
}

function isBusinessHours(hour: number): boolean {
  return hour >= 8 && hour < 18;
}

/** A small, honest reply-time indicator — not a live clock display, just a status line. */
export default function ReplyTimeIndicator() {
  const [withinHours, setWithinHours] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWithinHours(isBusinessHours(nairobiHour()));
  }, []);

  if (withinHours === null) return null;

  return (
    <p className="text-xs mt-3 flex items-center gap-1.5" style={{ color: "#888" }}>
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: withinHours ? "#25D366" : "#c9a04a" }}
        aria-hidden="true"
      />
      {withinHours
        ? "We're online now — typically reply within a few hours."
        : "Outside business hours (8am–6pm, Nairobi time) — we'll reply first thing."}
    </p>
  );
}
