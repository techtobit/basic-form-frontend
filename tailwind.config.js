/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#5c6ac4',
      bgPrimary: '#e3f2fd',
      secondary: '#ecc94b',
      black: '#000000',
      white : '#ffffff',
      lightWhite : '#f8f9fa',
      red : '#d62828',
      hover: "#3f4ca8"
    }
  },
  plugins: [],
}

