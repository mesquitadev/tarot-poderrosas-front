/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A40B52',
        'blue-custom': '#EBF2FF',
        'custom-start': '#A40B52',
        'custom-end': '#3E041F',
        'custom-primary': '#B44D6F',
        'custom-gray': '#717171',
        'custom-gray-text': '#737373',
        'custom-gray-light': '#F1F1F1',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
