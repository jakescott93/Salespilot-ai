"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { HouseContent } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav({ content }: { content: HouseContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-velvet",
        scrolled
          ? "bg-ground/85 backdrop-blur-md border-b border-line/60"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-10">
        <Link
          href={content.path}
          className="shrink-0"
          aria-label={`Velmont ${content.descriptor}`}
          onClick={() => setOpen(false)}
        >
          <Wordmark descriptor={content.descriptor} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {content.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="type-label-sm font-light text-ink-soft transition-colors duration-500 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href={content.cta.href}
            onClick={() => track("hero_acquisition_clicked", { house: content.house, placement: "nav" })}
            className="hidden md:inline-flex type-label-sm font-light text-accent border-b border-accent/40 pb-1 transition-colors duration-500 hover:border-accent"
          >
            {content.cta.label}
          </Link>

          <button
            type="button"
            className="lg:hidden flex h-11 w-11 flex-col items-end justify-center gap-[7px] -mr-2 pr-2"
            aria-expanded={open}
            aria-controls="velmont-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                "block h-px bg-ink transition-all duration-500 ease-velvet",
                open ? "w-7 translate-y-[4px] rotate-45" : "w-7",
              )}
            />
            <span
              className={cn(
                "block h-px bg-ink transition-all duration-500 ease-velvet",
                open ? "w-7 -translate-y-[4px] -rotate-45" : "w-5",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="velmont-menu"
            className="lg:hidden fixed inset-0 top-[76px] z-40 bg-ground/[0.985] backdrop-blur-xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <nav aria-label="Primary mobile" className="flex h-full flex-col px-6 pt-14 pb-12">
              <ul className="space-y-7">
                {content.nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-4xl font-light text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-auto"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href={content.cta.href}
                  onClick={() => {
                    setOpen(false);
                    track("hero_acquisition_clicked", { house: content.house, placement: "menu" });
                  }}
                  className="type-label text-accent border-b border-accent/40 pb-1"
                >
                  {content.cta.label}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
