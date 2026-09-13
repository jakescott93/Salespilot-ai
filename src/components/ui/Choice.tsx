"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Choice rows — the house alternative to radio buttons and pills.
 * Each option is a hairline-separated line; selection is marked by a
 * champagne index and a drawn underline, not by a filled box.
 */

export function ChoiceList({
  name,
  options,
  value,
  onChange,
  columns = 1,
}: {
  name: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  columns?: 1 | 2;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn(
        "border-t border-line/60",
        columns === 2 && "sm:grid sm:grid-cols-2 sm:gap-x-14 sm:border-t-0",
      )}
    >
      {options.map((opt, i) => {
        const selected = value === opt;
        return (
          <motion.button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt)}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 + i * 0.045, ease: EASE }}
            className={cn(
              "group flex w-full items-baseline gap-6 border-b border-line/60 py-4 sm:py-5 text-left",
              columns === 2 && "sm:border-t-0",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "font-display text-sm transition-colors duration-500 w-6 shrink-0",
                selected ? "text-accent" : "text-ink-faint group-hover:text-ink-soft",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative pb-1">
              <span
                className={cn(
                  "font-display text-xl xs:text-2xl font-light transition-colors duration-500",
                  selected ? "text-ink" : "text-ink-soft group-hover:text-ink",
                )}
              >
                {opt}
              </span>
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full origin-left bg-accent transition-transform duration-700 ease-velvet",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * Multi-select register. Custom marks: an empty hairline square that
 * fills with a champagne rule when chosen. No native checkboxes.
 */
export function MultiChoice({
  name,
  options,
  value = [],
  onChange,
}: {
  name: string;
  options: string[];
  value?: string[];
  onChange: (v: string[]) => void;
}) {
  const reduce = useReducedMotion();
  const toggle = (opt: string) =>
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt],
    );

  return (
    <div
      role="group"
      aria-label={name}
      className="grid gap-x-14 border-t border-line/60 sm:grid-cols-2 sm:border-t-0"
    >
      {options.map((opt, i) => {
        const selected = value.includes(opt);
        return (
          <motion.button
            key={opt}
            type="button"
            role="checkbox"
            aria-checked={selected}
            onClick={() => toggle(opt)}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.04 + i * 0.035, ease: EASE }}
            className="group flex w-full items-center gap-5 border-b border-line/60 py-4 text-left"
          >
            <span
              aria-hidden
              className={cn(
                "relative h-[15px] w-[15px] shrink-0 border transition-colors duration-500",
                selected ? "border-accent" : "border-line-strong group-hover:border-ink-soft",
              )}
            >
              <span
                className={cn(
                  "absolute inset-[3px] bg-accent transition-all duration-500 ease-velvet",
                  selected ? "opacity-100 scale-100" : "opacity-0 scale-50",
                )}
              />
            </span>
            <span
              className={cn(
                "font-display text-lg xs:text-xl font-light transition-colors duration-500",
                selected ? "text-ink" : "text-ink-soft group-hover:text-ink",
              )}
            >
              {opt}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/** A single consent line with the same custom mark. */
export function ConsentMark({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex items-start gap-5 text-left"
    >
      <span
        aria-hidden
        className={cn(
          "relative mt-[3px] h-[15px] w-[15px] shrink-0 border transition-colors duration-500",
          checked ? "border-accent" : "border-line-strong group-hover:border-ink-soft",
        )}
      >
        <span
          className={cn(
            "absolute inset-[3px] bg-accent transition-all duration-500 ease-velvet",
            checked ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
        />
      </span>
      <span className="text-[0.8125rem] font-light leading-relaxed text-ink-soft">
        {children}
      </span>
    </button>
  );
}
