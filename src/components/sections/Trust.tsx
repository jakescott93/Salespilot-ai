"use client";

import { Reveal, SplitLines } from "@/components/motion/Reveal";
import type { HouseContent } from "@/content/types";

/**
 * Trust, stated once and quietly. The proof register below it renders
 * only verified items supplied by the CMS — it ships empty by design,
 * never with invented claims.
 */
export function Trust({ content }: { content: HouseContent }) {
  return (
    <section
      className="border-t border-line/40 bg-ground"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 py-28 sm:py-44">
        <div className="grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SplitLines
              as="h2"
              lines={content.trust.headline}
              className="type-display font-display font-light"
              lineClassName="text-ink [&:nth-child(1)]:text-ink"
            />
            <span id="trust-heading" className="sr-only">
              {content.trust.headline.join(" ")}
            </span>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <dl className="divide-y divide-line/60 border-y border-line/60">
              {content.trust.points.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08} y={18} className="py-8">
                  <dt className="type-label-sm text-ink">{p.title}</dt>
                  <dd className="mt-4 text-[0.9375rem] font-light leading-relaxed text-ink-soft">
                    {p.copy}
                  </dd>
                </Reveal>
              ))}
            </dl>

            {content.proof.items.length > 0 && (
              <div className="mt-16">
                <p className="type-label-sm text-ink-faint">
                  {content.proof.label}
                </p>
                <ul className="mt-6 space-y-3">
                  {content.proof.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-light text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
