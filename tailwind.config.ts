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
        "Heading/H1-main": "#10B981",
        "Heading/H1-mainTwo": "#000000",
        "Heading/H1-mainThree": "#F8FAFC",
        "Subheading/H4": "#000000",
        label: "#475569",
        placeholder: "#94A3B8",
        "input-background": "#F8FAFC",
        "input-border": "#E2E8F0",
        "Body/Paragraph": "#121212",
        "Button/Primary": "#121212",
        "Button/Primary-background": "#8D9094",
        "Button/Primary-backgroundTwo": "#F1F5F9",
        "Checkbox/Checked": "#10B981",
        "Checkbox/Unchecked": "#D9D9D9",
        lavender: "#f8f6ff",
        purpleCustom: "#8b5cf6",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        spaceMono: ["var(--font-space-mono)"],
      },
      backgroundImage: {
        "auth-background":
          "linear-gradient(199.38deg, rgba(16, 185, 129, 0.5) 17.81%, rgba(139, 92, 246, 0.5) 95.61%)",
        "auth-background-mobile":
          "linear-gradient(186.76deg, rgba(16, 185, 129, 1) 2.36%, rgba(139, 92, 246, 1) 38.52%)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
