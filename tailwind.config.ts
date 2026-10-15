import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#060608",
        foreground: "#f4f4f5",
        brand: {
          red: "#e50914",
          brightRed: "#ff1a26",
          darkRed: "#990000",
          deepRed: "#590000",
          cyan: "#00e5ff",
          emerald: "#10b981",
          amber: "#f59e0b",
          gold: "#ffd700",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-reverse": "floatReverse 9s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "marquee-scroll": "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(15px) rotate(-2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "red-radial": "radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.28) 0%, rgba(153, 0, 0, 0.12) 45%, transparent 70%)",
        "red-linear": "linear-gradient(135deg, #ff1a26 0%, #e50914 50%, #990000 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(229, 9, 20, 0.08) 0%, rgba(15, 15, 20, 0.8) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;