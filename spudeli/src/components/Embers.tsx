"use client";

import { useReducedMotion } from "framer-motion";

/** Lightweight drifting-ember field. Deterministic (SSR-safe), CSS-animated. */
export function Embers({
  count = 26,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const parts = Array.from({ length: count }, (_, i) => {
    const left = (i * 37) % 100;
    const size = 1.5 + ((i * 13) % 5);
    const dur = 6 + ((i * 7) % 9);
    const delay = (i * 1.3) % 9;
    const drift = ((i % 5) - 2) * 12;
    return { left, size, dur, delay, drift, i };
  });
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {parts.map((p) => (
        <span
          key={p.i}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "9999px",
            background: "radial-gradient(circle, #F6B45E 0%, #E0701C 60%, transparent 70%)",
            boxShadow: "0 0 6px #E0701C",
            // @ts-expect-error CSS custom property
            "--drift": `${p.drift}px`,
            animation: `emberrise ${p.dur}s linear ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes emberrise {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          12% { opacity: 0.9; }
          70% { opacity: 0.7; }
          100% { transform: translate(var(--drift), -78vh) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
