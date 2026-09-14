"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site, img } from "@/content/site";
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-obsidian px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE } }}
        >
          {/* smoke + embers backdrop */}
          <div className="absolute inset-0 -z-10">
            <motion.img
              src={img.enterbg}
              alt=""
              aria-hidden
              className="hidden h-full w-full object-cover sm:block"
              initial={reduce ? {} : { scale: 1.12, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 3, ease: EASE }}
            />
            <motion.img
              src={img.enterbgv}
              alt=""
              aria-hidden
              className="h-full w-full object-cover sm:hidden"
              initial={reduce ? {} : { scale: 1.12, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 3, ease: EASE }}
            />
          </div>
          <Embers count={34} />

          <motion.div
            className="relative flex flex-col items-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          >
            {/* real logo on transparent bg, glowing */}
            <motion.div
              className="relative mb-8"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
            >
              <div
                className="absolute inset-0 -z-10 animate-flicker rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(224,112,28,0.45) 0%, transparent 65%)",
                  transform: "scale(1.8)",
                }}
                aria-hidden
              />
              <img
                src={img.logomark}
                alt="Spüdeli"
                className="h-32 w-32 object-contain drop-shadow-[0_0_30px_rgba(224,112,28,0.55)] md:h-44 md:w-44"
              />
            </motion.div>

            <p className="type-label text-ember">{site.descriptor}</p>
            <div className="my-5 overflow-hidden">
              <motion.div
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
              >
                <Wordmark className="type-hero text-bone" />
              </motion.div>
            </div>
            <motion.p
              className="type-lede text-cream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.3 }}
            >
              {site.tagline}
            </motion.p>

            <motion.button
              onClick={() => setOpen(false)}
              className="group mt-11 inline-flex items-center gap-3 rounded-full border border-ember/60 bg-ember/5 px-10 py-4 text-bone backdrop-blur-sm transition-colors duration-300 hover:bg-ember hover:text-obsidian"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.6 }}
            >
              <span className="type-label">Enter the Smokehouse</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </motion.button>
          </motion.div>

          <motion.p
            className="type-label absolute bottom-8 text-smoke/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.9 }}
          >
            {site.place}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
