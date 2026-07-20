"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";

function buildRequestMessage(fields: { name: string; description: string; quantity: string; notes: string }): string {
  const parts = [
    "Hi Northbird! I'm looking for a product I couldn't find in your catalogue.",
    "",
    `Product: ${fields.name}`,
  ];
  if (fields.description) parts.push(`Description: ${fields.description}`);
  if (fields.quantity) parts.push(`Preferred quantity: ${fields.quantity}`);
  if (fields.notes) parts.push(`Notes: ${fields.notes}`);
  parts.push("", "Could you help me source this?");
  return parts.join("\n");
}

function RequestProductModal({ onClose }: { onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const canSubmit = name.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const message = buildRequestMessage({ name, description, quantity, notes });
    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
    onClose();
  };

  const inputStyle = {
    borderColor: "var(--teal-light)",
    background: "white",
    color: "var(--charcoal)",
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(31,42,46,0.5)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-label="Request a product"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-md rounded-3xl p-6 md:p-8"
          style={{ background: "var(--cream)" }}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.94, y: reduceMotion ? 0 : 16 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--orange)" }}>
                Request a Product
              </p>
              <h2 className="font-display text-xl font-medium" style={{ color: "var(--teal-dark)" }}>
                Tell us what you need
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--cream-deep)] shrink-0"
              style={{ color: "var(--teal-dark)" }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="req-name" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--teal-dark)" }}>
                Product name *
              </label>
              <input
                id="req-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Branded travel adapters"
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-light)]"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="req-desc" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--teal-dark)" }}>
                Description
              </label>
              <textarea
                id="req-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Any detail that helps us source the right item"
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--teal-light)]"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="req-qty" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--teal-dark)" }}>
                Preferred quantity
              </label>
              <input
                id="req-qty"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 200 pieces"
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-light)]"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="req-notes" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--teal-dark)" }}>
                Additional notes
              </label>
              <textarea
                id="req-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Deadline, budget, branding ideas — anything else"
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--teal-light)]"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-press flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm disabled:opacity-40 hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.55)]"
              style={{ background: "#25D366", color: "white" }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send Request on WhatsApp
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}

export default function RequestProductSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="py-14 px-4" style={{ background: "var(--cream-deep)" }}>
        <Reveal variant="up">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-xl md:text-2xl font-medium mb-2" style={{ color: "var(--teal-dark)" }}>
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-sm mb-6" style={{ color: "#666" }}>
              Our full range goes beyond this catalogue — tell us what you need and we&apos;ll source it.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-press inline-block px-7 py-3 rounded-full font-semibold text-sm hover:shadow-[0_4px_16px_-4px_rgba(168,71,42,0.5)]"
              style={{ background: "var(--rust)", color: "var(--cream)" }}
            >
              Request a Product
            </button>
          </div>
        </Reveal>
      </section>

      <AnimatePresence>{open && <RequestProductModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
