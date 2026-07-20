export default function SectionLabel({ n, color = "var(--teal-light)" }: { n: string; color?: string }) {
  return (
    <p
      className="text-[11px] font-mono tracking-[0.2em] mb-2 select-none"
      style={{ color, opacity: 0.6 }}
      aria-hidden="true"
    >
      [{n}]
    </p>
  );
}
