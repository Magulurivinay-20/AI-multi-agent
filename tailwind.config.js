/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1E6FFF',
        navy: '#0B1E3F',
        'navy-light': '#112060',
        'input-bg': '#F4F8FF',
        'input-border': '#D8E4F5',
        'grey-text': '#7A90B3',
        'error-red': '#FF4D6A',
      },
      borderRadius: {
        card: '28px',
        input: '10px',
        btn: '12px',
      },
    },
  },
  plugins: [],
}
