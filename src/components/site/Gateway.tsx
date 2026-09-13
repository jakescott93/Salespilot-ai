"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { Scene } from "@/components/site/Scene";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The master-brand threshold. Two doors, one house. Hovering a side
 * lets its world breathe wider; the monogram holds the centre.
 */
export function Gateway() {
  const [side, setSide] = useState<"automotive" | "horology" | null>(null);
  const reduce = useReducedMotion();

  return (
    <main className="relative flex min-h-[100svh] flex-col bg-black lg:flex-row">
      {/* Centre mark */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
      >
        <Monogram className="h-9 w-10 text-brand-champagne" />
        <p className="mt-6 font-sans font-light text-sm tracking-wide3 uppercase text-brand-ivory">
          Velmont
        </p>
        <p className="mt-3 type-label-sm text-brand-stone">
          Exceptional things. Privately acquired.
        </p>
      </motion.div>

      <Door
        href="/automotive"
        house="automotive"
        title="Automotive"
        descriptor="Private Automotive Office"
        line="Exceptional vehicles. Privately acquired."
        active={side}
        onEnter={() => setSide("automotive")}
        onLeave={() => setSide(null)}
      />

      <div aria-hidden className="hidden w-px bg-white/10 lg:block" />
      <div aria-hidden className="block h-px bg-white/10 lg:hidden" />

      <Door
        href="/horology"
        house="horology"
        title="Horology"
        descriptor="Private Watch Office"
        line="Exceptional timepieces. Privately acquired."
        active={side}
        onEnter={() => setSide("horology")}
        onLeave={() => setSide(null)}
      />

      {/* Mobile centre mark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:hidden">
        <Monogram className="h-8 w-9 text-brand-champagne" />
      </div>
    </main>
  );
}

function Door({
  href,
  house,
  title,
  descriptor,
  line,
  active,
  onEnter,
  onLeave,
}: {
  href: string;
  house: "automotive" | "horology";
  title: string;
  descriptor: string;
  line: string;
  active: "automotive" | "horology" | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const dimmed = active !== null && active !== house;
  return (
    <Link
      href={href}
      data-theme={house}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={cn(
        "group relative flex flex-1 items-end overflow-hidden transition-[flex-grow,opacity] duration-1000 ease-velvet",
        "min-h-[50svh] lg:min-h-[100svh]",
        active === house && "lg:flex-[1.35]",
        dimmed && "opacity-70",
      )}
    >
      <Scene house={house} className="transition-transform duration-[1600ms] ease-velvet group-hover:scale-[1.03]" />

      <div className="relative z-10 w-full px-6 pb-12 sm:px-12 sm:pb-16">
        <p className="type-label-sm text-accent/90">{descriptor}</p>
        <p className="mt-4 font-display text-5xl sm:text-6xl font-light text-ink">
          {title}
        </p>
        <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-ink-soft">
          {line}
        </p>
        <span className="mt-8 inline-block type-label-sm text-ink border-b border-ink/30 pb-1 transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
          Enter
        </span>
      </div>
    </Link>
  );
}
