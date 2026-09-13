"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site, hero } from "@/content/site";
import { RiseLines } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Warm composed backdrop — replace with real photography via <img> later */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-cream to-bone" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 55% at 78% 22%, rgba(180,101,44,0.20), transparent 60%), radial-gradient(50% 50% at 12% 85%, rgba(90,90,56,0.16), transparent 60%)",
          }}
        />
      </div>

      {/* top meta row */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-32">
        <motion.p
          className="type-label text-ember"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          {hero.eyebrow}
        </motion.p>
      </div>

      <div className="relative z-0 mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <h1 className="type-hero text-ink">
          <RiseLines lines={[hero.line1, hero.line2]} />
        </h1>

        <motion.div
          className="mt-8 flex max-w-xl flex-col gap-8 md:mt-10"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        >
          <p className="type-lede text-stone">{hero.lede}</p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={site.justEatUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-bone transition-colors duration-300 hover:bg-ember"
            >
              <span className="type-label">Order on Just Eat</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#menu"
              className="type-label link-underline py-4 text-ink/80 hover:text-ink"
            >
              View the Menu
            </a>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="relative z-0 mx-auto w-full max-w-6xl px-5 pb-8 md:px-8">
        <div className="flex items-center gap-3 text-stone">
          <span className="type-label">{site.place}</span>
          <span className="h-px w-16 bg-olive/40" />
          <span className="type-label">Scroll</span>
        </div>
      </div>
    </section>
  );
}
