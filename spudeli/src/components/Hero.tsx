"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site, img } from "@/content/site";
import { RiseLines } from "./Reveal";
import { Embers } from "./Embers";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Hero image */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={img.sphero}
          alt="A loaded sweet potato spud piled with slow-smoked beef brisket"
          className="h-full w-full object-cover"
          initial={reduce ? {} : { scale: 1.12 }}
          animate={reduce ? {} : { scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        <div className="absolute inset-0 vignette" />
      </div>
      <Embers count={20} className="-z-10" />

      {/* eyebrow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-6xl px-5 pt-28 md:px-8 md:pt-32">
        <motion.p
          className="type-label text-ember"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          {site.descriptor}
        </motion.p>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 md:px-8 md:pb-20">
        <h1 className="type-hero text-bone">
          <RiseLines
            lines={["Slow-smoked.", "Loaded. Legendary."]}
            start={0.3}
          />
        </h1>

        <motion.div
          className="mt-7 flex max-w-xl flex-col gap-8"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
        >
          <p className="type-lede text-cream">
            Wirral&rsquo;s only smoke house deli. Slow-smoked meats piled on
            loaded jackets &amp; sweet potato spuds. {site.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={site.order.wirralBites}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-4 text-obsidian transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="type-label">Order Online</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#menu"
              className="type-label link-underline py-4 text-bone/80 hover:text-bone"
            >
              See the Menu
            </a>
          </div>
        </motion.div>

        <div className="mt-12 flex items-center gap-3 text-smoke">
          <span className="type-label">{site.place}</span>
          <span className="h-px w-14 bg-ember/50" />
          <span className="type-label">{site.openLine}</span>
        </div>
      </div>
    </section>
  );
}
