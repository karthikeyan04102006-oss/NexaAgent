import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--card)",
          border: "var(--card-border)",
        },
        editorial: {
          bg: "#F7F6FA",
          surface: "#FAF9FC",
          card: "#FFFFFF",
          text: "#17151C",
          secondary: "#696572",
          muted: "#96919F",
          border: "#E7E3EC",
          accent: "#A78BFA",
          secondaryAccent: "#C4B5FD",
          softPurple: "#DDD6FE",
          darkPurple: "#6D5BA6",
        },
        purpleAccent: {
          primary: "#A78BFA",
          secondary: "#C4B5FD",
          soft: "#DDD6FE",
          dark: "#6D5BA6",
        },
        nexa: {
          purple: "#A78BFA",
          softPurple: "#C4B5FD",
          darkPurple: "#6D5BA6",
          glow: "rgba(167, 139, 250, 0.12)",
          accent: "#A78BFA"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Courier New", "monospace"]
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.18em",
      },
      boxShadow: {
        'editorial': '0 1px 3px rgba(0,0,0,0.04), 0 10px 30px rgba(0,0,0,0.02)',
        'editorial-hover': '0 4px 20px rgba(0,0,0,0.06)',
        'red-accent': '0 0 15px rgba(131, 0, 0, 0.15)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
};
export default config;
