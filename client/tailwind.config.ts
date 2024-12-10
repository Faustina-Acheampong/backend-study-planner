import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0B",
        white: "#F5F5F5",
        whiteForced: "#FFFFFF",
        greyLight: "#E2E2E2",
        greyDark: "#444444",
        primary: {
          "100": "#4E46B4",
          "60": "#9C97D5",
          "10": "#EAE9F6"
        },
        secondary: {
          "100": "#40A69F",
          "60": "#94CDC9",
          "10": "#E8F4F3"
        },
        tertiary: {
          "100": "#9F4575",
          "60": "#C997B2",
          "10": "#F3E9EE"
        },
        success: {
          "100": "#70E000",
          "60": "#AFEE70",
          "10": "#EEFBE0"
        },
        info: {
          "100": "#3448F0",
          "60": "#8D99F7",
          "10": "#E7E9FD"
        },
        warning: {
          "100": "#FFB319",
          "60": "#FFD57E",
          "10": "#FFF6E3"
        },
        error: {
          "100": "#D33030",
          "60": "#E68B8B",
          "10": "#FAE6E6"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
