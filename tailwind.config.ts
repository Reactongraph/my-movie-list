import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)"],
        monoBold: ["var(--font-mono-bold)"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        "delay-200": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "delay-400": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
