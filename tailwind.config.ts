import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-inter)",
    },
    extend: {
      colors: {
        primary: "#F9F9F9",
        accent: {
          DEFAULT: "#212121",
          secondary: "#545454",
          hover: "#212121",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
