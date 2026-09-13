"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { HouseContent } from "@/content/types";

/**
 * The numbered journey. A slow hairline draws down the spine as the
 * visitor scrolls; each stage arrives in sequence. Automotive runs the
 * numerals monumental and offset; Horology keeps a single centred column.
 */
export function Process({ content }: { content: HouseContent }) {
  const isAuto = content.house === "automotive";
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"],
  });
  const spine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="office"
      className="border-t border-line/40 bg-ground"
      aria-labelledby="process-heading"
    >
      <div
        className={cn(
          "mx-auto px-5 sm:px-10 py-28 sm:py-44",
          isAuto ? "max-w-[1600px]" : "max-w-[900px]",
        )}
      >
        <Reveal>
          <p id="process-heading" className="type-label text-accent/80">
            {content.process.label}
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-24">
          {/* The spine */}
          <div
            aria-hidden
            className={cn(
              "absolute top-0 bottom-0 w-px bg-line/70",
              isAuto ? "left-[7px] sm:left-1/2" : "left-[7px]",
            )}
          />
          <motion.div
            aria-hidden
            style={reduce ? { height: "100%" } : { height: spine }}
            className={cn(
              "absolute top-0 w-px bg-accent/60",
              isAuto ? "left-[7px] sm:left-1/2" : "left-[7px]",
            )}
          />

          <ol className="space-y-24 sm:space-y-36">
            {content.process.steps.map((step, i) => {
              const left = isAuto && i % 2 === 0;
              return (
                <li key={step.index} className="relative">
                  {/* Node */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-3 h-[15px] w-[15px] rounded-full border border-accent/60 bg-ground",
                      isAuto
                        ? "left-0 sm:left-1/2 sm:-translate-x-1/2"
                        : "left-0",
                    )}
                  />
                  <Reveal
                    className={cn(
                      "pl-12",
                      isAuto &&
                        cn(
                          "sm:w-[44%] sm:pl-0",
                          left
                            ? "sm:mr-auto sm:text-right"
                            : "sm:ml-auto",
                        ),
                    )}
                  >
                    <p
                      aria-hidden
                      className="font-display text-6xl sm:text-8xl font-light leading-none text-ink/[0.07] select-none"
                    >
                      {step.index}
                    </p>
                    <h3 className="-mt-6 font-display text-3xl sm:text-4xl font-light text-ink">
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-5 max-w-sm text-base font-light leading-relaxed text-ink-soft",
                        isAuto && left && "sm:ml-auto",
                      )}
                    >
                      {step.copy}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
