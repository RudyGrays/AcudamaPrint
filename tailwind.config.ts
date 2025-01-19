import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
      },
      animation: {
        "underline-blink": "underlineBlink 2s infinite",
      },
      keyframes: {
        underlineBlink: {
          "0%, 100%": {
            "border-bottom": "1px solid foreground",
          },
          "50%": {
            "border-bottom": "1px solid transparent",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
