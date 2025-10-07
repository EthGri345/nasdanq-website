import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NASDANQ Brand Colors
        background: {
          primary: "#0a0a0a",
          secondary: "#1a1a1a",
          card: "#161616",
        },
        border: {
          DEFAULT: "#252525",
          glow: "#00ff88",
        },
        accent: {
          green: "#00ff88",
          "green-alt": "#0cff94",
          orange: "#ff6b00",
          pink: "#ff0080",
          purple: "#9d00ff",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a0a0a0",
          tertiary: "#666666",
        },
        success: "#00ff88",
        error: "#ff0080",
        warning: "#ff6b00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px #00ff88, 0 0 10px #00ff88" },
          "50%": { boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
