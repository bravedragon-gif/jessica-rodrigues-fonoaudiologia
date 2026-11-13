/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#16223F',
          blue: '#243D5B',
          wine: '#58203A',
          plum: '#74465B',
          rose: '#EBC4BF',
          cream: '#FAF1F1',
          surface: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Aileron', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', 'Aileron', 'Impact', 'sans-serif'],
        serif: ['"Bodoni Moda"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(22, 34, 63, 0.08)',
        card: '0 4px 24px -4px rgba(88, 32, 58, 0.07)',
      },
    },
  },
  plugins: [],
}
