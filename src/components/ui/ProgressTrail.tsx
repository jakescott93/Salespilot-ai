"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The movement indicator: 01 —— 02 —— 03. Passed stages hold champagne;
 * the connecting rules draw themselves as the client advances. Never
 * "Step 1 of 6".
 */
export function ProgressTrail({
  total,
  current,
  className,
}: {
  total: number;
  current: number; // 0-based
  className?: string;
}) {
  const marks = Array.from({ length: total }, (_, i) => i);
  const dense = total > 8;
  return (
    <div
      className={cn("items-center", dense ? "hidden md:flex" : "flex", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={Math.min(current + 1, total)}
      aria-label="Progress through the brief"
    >
      {marks.map((i) => (
        <span key={i} className="flex items-center">
          <span
            className={cn(
              "font-display text-[0.8125rem] transition-colors duration-700",
              i < current
                ? "text-accent/70"
                : i === current
                  ? "text-accent"
                  : "text-ink-faint/60",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          {i < total - 1 && (
            <span className="relative mx-2 sm:mx-3 h-px w-4 sm:w-8 overflow-hidden bg-line/70">
              <motion.span
                className="absolute inset-0 origin-left bg-accent/60"
                initial={false}
                animate={{ scaleX: i < current ? 1 : 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/**
 * Compact variant for long flows on narrow screens: the current numeral,
 * a drawn hairline, and the destination — never "Step 4 of 20".
 */
export function ProgressLine({
  total,
  current,
  className,
}: {
  total: number;
  current: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-4 md:hidden", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={Math.min(current + 1, total)}
      aria-label="Progress through the brief"
    >
      <span className="font-display text-[0.8125rem] text-accent">
        {String(Math.min(current + 1, total)).padStart(2, "0")}
      </span>
      <span className="relative h-px flex-1 overflow-hidden bg-line/70">
        <motion.span
          className="absolute inset-0 origin-left bg-accent/60"
          initial={false}
          animate={{ scaleX: Math.min((current + 1) / total, 1) }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
      <span className="font-display text-[0.8125rem] text-ink-faint/60">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
