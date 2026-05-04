import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#12121a",
        "surface-2": "#0d0d14",
        foreground: "#e4e4e7",
        muted: "#9ca3af",
        cyan: {
          DEFAULT: "#00f0ff",
          dim: "rgba(0, 240, 255, 0.6)",
        },
        magenta: {
          DEFAULT: "#ff00e5",
          dim: "rgba(255, 0, 229, 0.6)",
        },
        amber: {
          DEFAULT: "#ffb800",
          dim: "rgba(255, 184, 0, 0.6)",
        },
        success: "#00ff88",
        info: "#6b8aff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(0, 240, 255, 0.25)",
        "glow-magenta": "0 0 24px rgba(255, 0, 229, 0.25)",
        "glow-amber": "0 0 24px rgba(255, 184, 0, 0.25)",
        "glow-success": "0 0 24px rgba(0, 255, 136, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
