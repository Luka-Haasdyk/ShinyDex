/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'forestGreenLight': '#3f3f3f',
        'forestGreenMedium': '#464b37',
        'forestGreenDark': '#afb4ad',
        'forestGray': '#656963',
        'lightBlack' : '#3b3b3b',
        'gradientStart': '#f0fcab',
        'gradientEnd': '#60bf8f'
      },
    },
  },
  plugins: [],
};

