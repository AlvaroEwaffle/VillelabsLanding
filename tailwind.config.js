/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      colors: {
        // Colores premium del proyecto
        main: "#0f172a", // dark blue (slate-900)
        accent: "#2175a1", // azul destacado del hero
        foreground: "#ededed",
      },
      borderRadius: {
        hero: "2rem",
        premium: "1.5rem",
      },
      boxShadow: {
        hero: "0 40px 120px rgba(15, 23, 42, 0.8)",
        premium: "0 20px 60px rgba(0, 0, 0, 0.3)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.1)",
        accent: "0 0 30px rgba(33, 117, 161, 0.3)",
        'accent-lg': "0 10px 40px rgba(33, 117, 161, 0.3)",
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
