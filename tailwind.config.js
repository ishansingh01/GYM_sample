/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        iron: {
          orange: '#FF5500',
          'orange-glow': '#FF6A1A',
          lime: '#CCFF00',
          dark: '#09090b',
          surface: '#121216',
          card: '#18181e',
          border: '#272732',
          muted: '#71717a'
        }
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 85, 0, 0.35)',
        'glow-lime': '0 0 25px -5px rgba(204, 255, 0, 0.35)',
        'subtle': '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
};
