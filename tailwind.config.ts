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
          DEFAULT: "var(--card)",
          elevated: "var(--card)",
          border: "var(--card-border)",
        },
        nexa: {
          darkred: "#830000",
          crimson: "#BC0202",
          red: "#FF0000",
          glow: "rgba(188, 2, 2, 0.25)",
          accent: "#ff2a2a"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(135deg, #830000 0%, #BC0202 50%, #FF0000 100%)",
      },
      boxShadow: {
        'red-glow': '0 0 20px -3px rgba(188, 2, 2, 0.3)',
        'red-glow-lg': '0 0 35px -5px rgba(255, 0, 0, 0.4)',
        'subtle': '0 2px 10px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
