/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures Tailwind scans all component files
  ],
  theme: {
    extend: {
      animation: {
        floatingBall: "float 5s ease-in-out infinite",
        fadeIn: "fadeIn 1.5s ease-in-out",
        slideLeft: "slideLeft 1.2s ease-out",
        slideRight: "slideRight 1.2s ease-out",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(50px) translateX(0px)" },
          "50%": { transform: "translateY(-50px) translateX(50px)" },
          "100%": { transform: "translateY(0px) translateX(0px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideLeft: {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: 0, transform: "translateX(50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};