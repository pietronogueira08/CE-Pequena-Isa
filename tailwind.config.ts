import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cepi: {
          navy: {
            DEFAULT: "#1B3A6B",
            50: "#EEF3F9",
            100: "#D6E3F2",
            200: "#B0CBE6",
            300: "#7EA9D4",
            400: "#4D85C0",
            500: "#1B3A6B",
            600: "#152E56",
            700: "#102341",
            800: "#0C192E",
            900: "#070E1A",
          },
          gold: {
            DEFAULT: "#F4C430",
            50: "#FEF9E6",
            100: "#FDF1C2",
            200: "#FBE68A",
            300: "#F8D752",
            400: "#F4C430",
            500: "#DCA615",
            600: "#B6850E",
            700: "#8B6309",
            800: "#604306",
            900: "#362403",
          },
          sky: {
            DEFAULT: "#4FA8D8",
            50: "#F0F8FD",
            100: "#DBEFF9",
            200: "#BEE0F5",
            300: "#91CBEE",
            400: "#4FA8D8",
            500: "#2B8FC6",
            600: "#1E70A0",
            700: "#18567B",
            800: "#144460",
            900: "#0E2D3F",
          },
          green: {
            DEFAULT: "#4C9A4C",
            50: "#F1F8F1",
            100: "#DFEFDF",
            200: "#C1E1C1",
            300: "#96CE96",
            400: "#4C9A4C",
            500: "#3E833E",
            600: "#306730",
            700: "#244E24",
            800: "#1B3B1B",
            900: "#112411",
          },
          orange: {
            DEFAULT: "#D9772E",
            50: "#FCF5F0",
            100: "#F7E6DC",
            200: "#F0CDBA",
            300: "#E6AB8C",
            400: "#D9772E",
            500: "#BD5E19",
            600: "#964712",
            700: "#70330D",
            800: "#4F2309",
            900: "#2E1405",
          },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(27, 58, 107, 0.08)",
        "glass-hover": "0 14px 40px 0 rgba(27, 58, 107, 0.14)",
        "glass-lg": "0 20px 50px -10px rgba(27, 58, 107, 0.18)",
        "gold-glow": "0 0 25px rgba(244, 196, 48, 0.45)",
        "sky-glow": "0 0 25px rgba(79, 168, 216, 0.4)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
