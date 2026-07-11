"use client";

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  size?: "sm" | "md";
}

export default function QuantityStepper({ value, onChange, min = 1, size = "md" }: Props) {
  const dim = size === "sm" ? "w-7 h-7 text-sm" : "w-8 h-8 text-base";
  return (
    <div
      className="inline-flex items-center rounded-full border overflow-hidden"
      style={{ borderColor: "var(--teal-light)" }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${dim} flex items-center justify-center font-semibold transition-colors hover:bg-[var(--cream-deep)] disabled:opacity-30 disabled:hover:bg-transparent`}
        style={{ color: "var(--teal-dark)" }}
      >
        −
      </button>
      <span
        className={`${size === "sm" ? "w-8 text-xs" : "w-10 text-sm"} text-center font-semibold tabular-nums`}
        style={{ color: "var(--teal-dark)" }}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className={`${dim} flex items-center justify-center font-semibold transition-colors hover:bg-[var(--cream-deep)]`}
        style={{ color: "var(--teal-dark)" }}
      >
        +
      </button>
    </div>
  );
}
