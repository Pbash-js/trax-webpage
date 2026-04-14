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
        bg: "#0D0D0D",
        surface: "#161616",
        "surface-elevated": "#1E1E1E",
        accent: "#D4A853",
        "accent-muted": "#D4A85340",
        "text-primary": "#F0EDE8",
        "text-secondary": "#8A8680",
        "text-tertiary": "#4A4845",
        border: "#2A2825",
        success: "#4CAF7D",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        "hero-desktop": ["72px", { lineHeight: "1.05" }],
        "hero-mobile": ["48px", { lineHeight: "1.05" }],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
