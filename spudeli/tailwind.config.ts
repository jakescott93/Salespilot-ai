import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark smokehouse palette — obsidian, ash, ember, gold, bone.
        obsidian: "#0C0A08",
        char: "#141110",
        ash: "#1E1916",
        smoke: "#9A8C7C", // muted warm grey — secondary text
        bone: "#F3EADA", // warm off-white — primary light text
        cream: "#E7D9C2",
        ember: "#E0701C", // primary accent — fire
        emberDeep: "#B4531220",
        flame: "#F0913A",
        gold: "#C9A24B", // secondary accent, sparing
        blood: "#7A2E12",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Archivo", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.45em",
      },
      transitionTimingFunction: {
        smoke: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%,100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translateY(-120px)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        flicker: "flicker 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
