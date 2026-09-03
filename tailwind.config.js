/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          yellow: "#facc15",
          white: "#ffffff",
          darkGray: "#1f2937",
          lightGray: "#f3f4f6",
        },
      },
    },
  },
  plugins: [],
}
