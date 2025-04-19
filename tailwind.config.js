module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors, // ✅ bring back full default color palette
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}