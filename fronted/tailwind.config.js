/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          DEFAULT: '#36393f', // Color de fondo de Discord
        },
      },
    },
  },
  plugins: [],
};
