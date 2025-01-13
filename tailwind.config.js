/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        's': '97%',
      },
      backgroundImage: {
        'starry': "url('/public/starry.gif')",
        'starry2': "url('/public/starry2.gif')",
        'lightBlue': "url('/public/lightblue.jpeg')",
        'whiteBg': "url('/public/whiteBg.png')",
        'whiteBg2': "url('/public/whiteBg2.jpg')",
        'hexa': "url('/public/hexa.jpg')",
        'hexa2': "url('/public/hexa2.jpg')",
      }
    },
  },
  plugins: [],
};
