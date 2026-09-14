"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Wordmark } from "./Brand";
import { Embers } from "./Embers";

const EASE = [0.22, 1, 0.36, 1] as const;

export function EnterGate() {
  const [open, setOpen] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
        >
          {/* backdrop glow + embers */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 55%, rgba(224,112,28,0.16), transparent 70%)",
            }}
            aria-hidden
          />
          <Embers count={30} />

          <motion.div
            className="relative flex flex-col items-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          >
            <p className="type-label text-ember">{site.descriptor}</p>
            <div className="my-6 overflow-hidden">
              <motion.div
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              >
                <Wordmark className="type-mega text-bone" />
              </motion.div>
            </div>
            <motion.p
              className="type-lede text-smoke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            >
              {site.tagline}
            </motion.p>

            <motion.button
              onClick={() => setOpen(false)}
              className="group mt-12 inline-flex items-center gap-3 rounded-full border border-ember/60 px-9 py-4 text-bone transition-colors duration-300 hover:bg-ember hover:text-obsidian"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.25 }}
            >
              <span className="type-label">Enter</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </motion.button>
          </motion.div>

          <motion.p
            className="type-label absolute bottom-8 text-smoke/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {site.place}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
