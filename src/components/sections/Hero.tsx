"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Scene } from "@/components/site/Scene";
import { SplitLines } from "@/components/motion/Reveal";
import { CtaLink, QuietLink } from "@/components/ui/Cta";
import { track } from "@/lib/analytics";
import type { HouseContent } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Two hero temperaments, one DNA. Automotive is monumental and
 * left-anchored — architecture at dusk. Horology is centred and quieter —
 * a smaller voice in a darker room.
 */
export function Hero({ content }: { content: HouseContent }) {
  const reduce = useReducedMotion();
  const isAuto = content.house === "automotive";

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      aria-label={`Velmont ${content.descriptor}`}
    >
      <Scene house={content.house} media={content.hero.media} />

      <div
        className={
          isAuto
            ? "relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-10 pb-24 sm:pb-28 pt-40"
            : "relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-5 sm:px-10 pb-24 sm:pb-28 pt-40 text-center"
        }
      >
        {!isAuto && (
          <motion.p
            className="type-label text-accent/90 mb-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
          >
            Velmont Horology
          </motion.p>
        )}

        <SplitLines
          as="h1"
          lines={content.hero.headline}
          delay={0.9}
          stagger={0.22}
          className={
            isAuto
              ? "type-hero font-display font-light text-ink max-w-[16em]"
              : "type-display font-display font-light text-ink"
          }
        />

        <motion.div
          className={isAuto ? "mt-12 sm:mt-16" : "mt-12 flex flex-col items-center"}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: isAuto ? 2.1 : 1.9, ease: EASE }}
        >
          <p className="type-label text-ink mb-1">Velmont</p>
          <p className="type-label-sm text-ink-soft">{content.descriptor}</p>

          <div
            className={
              isAuto
                ? "mt-10 flex flex-col gap-7 xs:flex-row xs:items-center xs:gap-10"
                : "mt-10 flex flex-col items-center gap-7 xs:flex-row xs:gap-10"
            }
          >
            <CtaLink
              href={content.cta.href}
              tone="champagne"
              onClick={() =>
                track("hero_acquisition_clicked", {
                  house: content.house,
                  placement: "hero",
                })
              }
            >
              {content.cta.label}
            </CtaLink>
            <QuietLink href={content.secondaryCta.href}>
              {content.secondaryCta.label}
            </QuietLink>
          </div>

          <p
            className={
              isAuto
                ? "mt-10 max-w-sm text-sm font-light leading-relaxed text-ink-soft"
                : "mt-10 max-w-sm text-sm font-light leading-relaxed text-ink-soft"
            }
          >
            {content.hero.support}
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden h-14 w-px -translate-x-1/2 bg-ink/40 sm:block v-cue"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
      />
    </section>
  );
}
