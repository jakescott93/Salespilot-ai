import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm delicatessen palette — espresso, bone, ember, olive.
        ink: "#211B15", // deep espresso brown-black
        espresso: "#2C241C",
        bone: "#F5EFE3", // warm cream ground
        cream: "#EFE7D6",
        parchment: "#E7DCC6",
        stone: "#6E6353", // muted warm grey-brown for secondary text
        ember: "#B4652C", // burnt amber — the primary accent
        olive: "#5A5A38", // deep olive — secondary accent / rules
        clay: "#8C5A3B",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Archivo", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.4em",
      },
      transitionTimingFunction: {
        deli: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
