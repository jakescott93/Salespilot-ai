"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monogram } from "@/components/brand/Monogram";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The arrival: black, a small champagne V, VELMONT, the office descriptor,
 * then a slow dissolve into the hero. Plays once per session per house,
 * never for returning visitors within the session, and never under
 * prefers-reduced-motion. It can always be dismissed with a tap.
 */
export function Intro({ house, descriptor }: { house: string; descriptor: string }) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    try {
      const key = `velmont:intro:${house}`;
      if (!window.sessionStorage.getItem(key)) {
        window.sessionStorage.setItem(key, "1");
        setShow(true);
        const t = window.setTimeout(() => setShow(false), 4600);
        return () => window.clearTimeout(t);
      }
    } catch {
      /* storage unavailable — skip the intro rather than risk replaying */
    }
  }, [house, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
          onClick={() => setShow(false)}
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
            >
              <Monogram className="h-10 w-11 text-brand-champagne" />
            </motion.div>
            <motion.p
              className="mt-8 font-sans font-light text-sm tracking-wide3 uppercase text-brand-ivory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.5, ease: EASE }}
            >
              Velmont
            </motion.p>
            <motion.p
              className="mt-4 type-label-sm text-brand-stone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 2.4, ease: EASE }}
            >
              {descriptor}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
