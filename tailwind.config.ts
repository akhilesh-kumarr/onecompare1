import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        emerald: {
          glow: "#10b981"
        }
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 34px rgba(16, 185, 129, 0.22)",
        "blue-glow": "0 0 38px rgba(56, 189, 248, 0.18)",
        panel: "0 24px 90px rgba(0, 0, 0, 0.38)"
      },
      backgroundImage: {
        "grid-glow":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)"
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.6s infinite"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
