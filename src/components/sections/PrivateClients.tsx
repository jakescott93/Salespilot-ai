"use client";

import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { CtaLink } from "@/components/ui/Cta";
import { track } from "@/lib/analytics";
import type { HouseContent } from "@/content/types";

/**
 * The dark room. Deliberately underlit — the one section that withholds
 * more than it shows. Nothing here promises access to specific assets;
 * it describes how Velmont works for clients who prefer the quiet route.
 */
export function PrivateClients({ content }: { content: HouseContent }) {
  return (
    <section
      id="private"
      className="relative overflow-hidden border-t border-line/40 bg-black"
      aria-labelledby="private-heading"
    >
      {/* A single, distant light */}
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(70%_60%_at_30%_20%,rgb(var(--v-surface)/0.9)_0%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-10 py-32 sm:py-48">
        <SplitLines
          as="h2"
          lines={[content.privateSection.headline]}
          className="type-display font-display font-light text-ink"
        />
        <span id="private-heading" className="sr-only">
          {content.privateSection.headline}
        </span>

        <Reveal delay={0.25}>
          <p className="mt-10 max-w-md font-display text-2xl font-light italic leading-snug text-ink-soft">
            {content.privateSection.intro}
          </p>
        </Reveal>

        <ul className="mt-16 max-w-xl space-y-0 border-t border-line/50">
          {content.privateSection.points.map((p, i) => (
            <Reveal
              as="li"
              key={p}
              delay={0.1 + i * 0.06}
              y={14}
              className="border-b border-line/50 py-5"
            >
              <span className="text-[0.9375rem] font-light leading-relaxed text-ink-soft">
                {p}
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.3} className="mt-16">
          <CtaLink
            href={`${content.path}/private`}
            tone="champagne"
            onClick={() =>
              track("private_access_requested", {
                house: content.house,
                placement: "section",
              })
            }
          >
            {content.privateSection.cta}
          </CtaLink>
        </Reveal>
      </div>
    </section>
  );
}
