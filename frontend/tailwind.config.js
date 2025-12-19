/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f0ff',
          purple: '#bd00ff',
          pink: '#ff0055',
        },
        dark: {
          bg: '#0a0a0a',
          card: '#121212',
          DEFAULT: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 10px rgba(255, 0, 85, 0.5)',
        'glow-purple': '0 0 20px rgba(189, 0, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
