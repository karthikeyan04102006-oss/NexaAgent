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
        background: "#000000",
        surface: {
          DEFAULT: "#0a0a0c",
          elevated: "#121216",
          border: "#1f1f26",
          hover: "#181820"
        },
        nexa: {
          darkred: "#830000",
          crimson: "#BC0202",
          red: "#FF0000",
          glow: "rgba(188, 2, 2, 0.3)",
          accent: "#ff2a2a"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(135deg, #830000 0%, #BC0202 50%, #FF0000 100%)",
        "red-dark-gradient": "linear-gradient(180deg, rgba(131, 0, 0, 0.25) 0%, rgba(10, 10, 12, 0) 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        'red-glow': '0 0 20px -3px rgba(188, 2, 2, 0.4)',
        'red-glow-lg': '0 0 35px -5px rgba(255, 0, 0, 0.5)',
        'subtle': '0 4px 20px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'execution-flow': 'flowLine 1.5s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 10px rgba(188, 2, 2, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 0, 0, 0.6)' },
        },
        flowLine: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
