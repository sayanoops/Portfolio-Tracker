/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        's': '97%',
      },
      backgroundImage: {
        'starry': "url('/starry.gif')",
        'starry2': "url('/starry2.gif')",
        'lightBlue': "url('/lightblue.jpeg')",
        'whiteBg': "url('/whiteBg.png')",
        'whiteBg2': "url('/whiteBg2.jpg')",
        'hexa': "url('/hexa.jpg')",
        'hexa2': "url('/hexa2.jpg')",
        'hexa3': "url('/hexa3.jpg')",
      }
    },
  },
  plugins: [],
};
