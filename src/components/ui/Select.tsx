"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Searchable selector — a combobox drawn in house style, never the
 * native dropdown. Type to filter; arrow keys and Enter work; the list
 * sits on a raised surface with hairline rules.
 */
export function SearchSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Begin typing…",
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => setQuery(value ?? ""), [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q === value?.toLowerCase()) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options, value]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const commit = (opt: string) => {
    onChange(opt);
    setQuery(opt);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <label className="type-label-sm text-ink-soft" htmlFor={`${listId}-input`}>
        {label}
      </label>
      <input
        id={`${listId}-input`}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        className="v-field mt-2"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActive((a) => Math.min(a + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter" && open && filtered[active]) {
            e.preventDefault();
            commit(filtered[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.ul
            id={listId}
            role="listbox"
            className="v-scroll absolute z-30 mt-2 max-h-72 w-full overflow-y-auto border border-line/80 bg-raised/95 backdrop-blur-md"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {filtered.map((opt, i) => (
              <li key={opt} role="option" aria-selected={opt === value}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-baseline justify-between border-b border-line/50 px-5 py-3.5 text-left last:border-b-0",
                    "font-display text-lg font-light transition-colors duration-300",
                    i === active || opt === value
                      ? "text-ink bg-ink/[0.04]"
                      : "text-ink-soft hover:text-ink",
                  )}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(opt)}
                >
                  <span>{opt}</span>
                  {opt === value && (
                    <span aria-hidden className="text-accent text-xs tracking-wide2">
                      Selected
                    </span>
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
