import type { Config } from "tailwindcss";

/**
 * VELMONT design tokens.
 *
 * Fixed brand constants live under `brand.*`; everything the two houses
 * theme differently (ground, surface, line, accent…) is expressed as a CSS
 * variable set on [data-theme="automotive"|"horology"] in globals.css, so
 * components are written once and inherit the house they sit inside.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          obsidian: "#050505",
          titanium: "#2E2E2E",
          stone: "#686868",
          champagne: "#D4B073",
          ivory: "#F6F4ED",
          green: "#0B2D23",
          taupe: "#9C8F7A",
        },
        ground: "rgb(var(--v-ground) / <alpha-value>)",
        surface: "rgb(var(--v-surface) / <alpha-value>)",
        raised: "rgb(var(--v-raised) / <alpha-value>)",
        line: "rgb(var(--v-line) / <alpha-value>)",
        "line-strong": "rgb(var(--v-line-strong) / <alpha-value>)",
        ink: "rgb(var(--v-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--v-ink-soft) / <alpha-value>)",
        "ink-faint": "rgb(var(--v-ink-faint) / <alpha-value>)",
        accent: "rgb(var(--v-accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        label: "0.32em",
        wide2: "0.2em",
        wide3: "0.44em",
      },
      transitionTimingFunction: {
        // The house curve: weighted, decisive, never bouncy.
        velvet: "cubic-bezier(0.22, 1, 0.36, 1)",
        drift: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
export default config;
