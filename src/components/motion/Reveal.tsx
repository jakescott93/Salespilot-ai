"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The house entrance: a slow, weighted rise. Used for body copy, labels
 * and structural elements. Headlines use <SplitLines /> instead.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 1.1,
  once = true,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "p" | "span" | "section" | "li" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Masked line-by-line headline reveal. Pass each line as a string; lines
 * rise out of an overflow mask in sequence — editorial, never bouncy.
 *
 * The in-view observer lives on the WRAPPER, not the lines: a line
 * translated outside its overflow mask never intersects the viewport,
 * so observing the lines themselves would never fire.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.14,
  as = "h2",
  once = true,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: 1.15, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export { EASE };
