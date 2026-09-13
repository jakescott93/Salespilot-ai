"use client";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { HouseContent } from "@/content/types";

/**
 * Not an inventory grid — a ledger of live client instructions.
 * Automotive sets them as monumental rows; Horology as a narrower,
 * quieter register, closer to an auction catalogue page.
 */
export function Mandates({ content }: { content: HouseContent }) {
  const isAuto = content.house === "automotive";

  return (
    <section
      className={cn(
        "border-t border-line/40",
        isAuto ? "bg-surface/60" : "bg-ground",
      )}
      aria-labelledby="mandates-heading"
    >
      <div
        className={cn(
          "mx-auto px-5 sm:px-10 py-28 sm:py-40",
          isAuto ? "max-w-[1600px]" : "max-w-[1100px]",
        )}
      >
        <Reveal>
          <p id="mandates-heading" className="type-label text-accent/80">
            {content.mandates.label}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-ink-soft">
            {content.mandates.note}
          </p>
        </Reveal>

        <ol className="mt-20 border-t border-line/60">
          {content.mandates.items.map((m, i) => (
            <Reveal
              as="li"
              key={m.index}
              delay={i * 0.08}
              className="group border-b border-line/60"
            >
              <div
                className={cn(
                  "grid gap-x-8 gap-y-6 py-12 sm:py-16 transition-colors duration-700",
                  isAuto
                    ? "sm:grid-cols-[80px_1fr_auto] items-start"
                    : "sm:grid-cols-[64px_1fr_auto] items-baseline",
                )}
              >
                <span
                  aria-hidden
                  className="font-display text-xl font-light text-ink-faint transition-colors duration-700 group-hover:text-accent"
                >
                  {m.index}
                </span>

                <div>
                  <h3
                    className={cn(
                      "font-display font-light leading-[1.05] text-ink",
                      isAuto
                        ? "text-4xl sm:text-6xl"
                        : "text-3xl sm:text-5xl",
                    )}
                  >
                    <span className="block">{m.maker}</span>
                    <span className="block text-ink-soft transition-colors duration-700 group-hover:text-ink">
                      {m.model}
                    </span>
                  </h3>
                  <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                    {m.details.map((d) => (
                      <li
                        key={d}
                        className="text-[0.8125rem] font-light tracking-wide2 text-ink-soft"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:text-right">
                  <p className="type-label-sm text-ink-faint">Status</p>
                  <p className="mt-2 type-label-sm text-accent">{m.status}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
