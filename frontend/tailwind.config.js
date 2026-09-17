/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#008F68',
          'green-dark': '#006B4F',
          'green-light': '#00B87A',
          saffron: '#E8721A',
          'saffron-light': '#F5951D',
        },
        ivory: '#FAF7F2',
        'ivory-dark': '#F2EDE4',
        navy: '#1A2340',
        'warm-beige': '#E8DFD0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        handwriting: ['Kalam', 'cursive'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease forwards',
        'count-up': 'countUp 0.5s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'green-lg': '0 8px 32px rgba(0,143,104,0.25)',
        'green-xl': '0 12px 48px rgba(0,143,104,0.35)',
      },
    },
  },
  plugins: [],
}
