"use client";

import { SplitLines, Reveal } from "@/components/motion/Reveal";
import { CtaLink, QuietLink } from "@/components/ui/Cta";
import { track } from "@/lib/analytics";
import type { HouseContent } from "@/content/types";

/** The closing word: one invitation, plenty of air. */
export function Invitation({ content }: { content: HouseContent }) {
  const isAuto = content.house === "automotive";
  return (
    <section className="border-t border-line/40 bg-surface/50">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 sm:px-10 py-32 sm:py-48 text-center">
        <SplitLines
          as="h2"
          lines={
            isAuto
              ? ["Tell us what", "you’re looking for."]
              : ["Tell us the piece.", "We’ll do the rest."]
          }
          className="type-display font-display font-light text-ink"
        />
        <Reveal delay={0.4} className="mt-14">
          <CtaLink
            href={content.cta.href}
            tone="champagne"
            onClick={() =>
              track("hero_acquisition_clicked", {
                house: content.house,
                placement: "closing",
              })
            }
          >
            {content.cta.label}
          </CtaLink>
        </Reveal>
        <Reveal delay={0.55} className="mt-8">
          <QuietLink href={`${content.path}/sell`}>
            {isAuto ? "Sell a Vehicle" : "Sell a Timepiece"}
          </QuietLink>
        </Reveal>
      </div>
    </section>
  );
}
