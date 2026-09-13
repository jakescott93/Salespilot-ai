"use client";

import { Reveal, SplitLines } from "@/components/motion/Reveal";
import type { HouseContent } from "@/content/types";

/**
 * The editorial statement of the model, followed by the capabilities as a
 * slow typographic procession — one tracked line at a time, no icon grid.
 */
export function Difference({ content }: { content: HouseContent }) {
  const isAuto = content.house === "automotive";
  const h = content.difference.headline;
  const first = h.slice(0, Math.ceil(h.length / 2));
  const second = h.slice(Math.ceil(h.length / 2));

  return (
    <section
      id="difference"
      className="relative border-t border-line/40 bg-ground"
      aria-labelledby="difference-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 py-28 sm:py-44">
        <Reveal>
          <p className="type-label text-accent/80">
            {isAuto ? "The Difference" : "The House"}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="difference-heading" className="sr-only">
              {h.join(" ")}
            </h2>
            <SplitLines
              as="div"
              lines={first}
              className="type-display font-display font-light text-ink"
              stagger={0.16}
            />
            <SplitLines
              as="div"
              lines={second}
              delay={0.35}
              stagger={0.16}
              className="type-display font-display font-light text-ink-faint mt-6 lg:mt-10 lg:pl-[12%]"
            />
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <Reveal delay={0.3}>
              <p className="max-w-md text-base font-light leading-loose text-ink-soft">
                {content.difference.intro}
              </p>
            </Reveal>

            <ul className="mt-14 border-t border-line/60">
              {content.difference.capabilities.map((cap, i) => (
                <Reveal
                  as="li"
                  key={cap}
                  delay={i * 0.05}
                  y={16}
                  duration={0.9}
                  className="border-b border-line/60"
                >
                  <span className="flex items-baseline justify-between py-4">
                    <span className="type-label-sm text-ink">{cap}</span>
                    <span
                      aria-hidden
                      className="font-display text-sm text-ink-faint"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
