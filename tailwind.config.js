/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mik: {
          bg: "#000000",
          elevated: "#0c0d10",
          card: "#121318",
          border: "rgba(255, 255, 255, 0.09)",
          borderHover: "rgba(255, 255, 255, 0.22)",
          text: "#F8F8FA",
          muted: "rgba(255, 255, 255, 0.52)",
          dim: "rgba(255, 255, 255, 0.25)",
          yellow: "#FFFFFF",
          yellowHover: "#FFFFFF",
          yellowGlow: "rgba(255, 255, 255, 0.55)",
          white: "#FFFFFF",
          whiteGlow: "rgba(255, 255, 255, 0.65)",
        }
      },
      boxShadow: {
        'neon-white': '0 0 20px rgba(255, 255, 255, 0.65), 0 0 40px rgba(255, 255, 255, 0.3)',
        'neon-white-sm': '0 0 12px rgba(255, 255, 255, 0.55)',
        'neon-white-lg': '0 0 35px rgba(255, 255, 255, 0.8), 0 0 70px rgba(255, 255, 255, 0.4)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        monumental: '0.25em',
        wide: '0.12em',
      }
    },
  },
  plugins: [],
}
