/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        discord: {
          DEFAULT: "#36393f",
        },
        "#0C1821": "#0C1821",
        "#18242D": "#18242D",
        "#121E27": "#121E27",
        "#0B161E": "#0B161E",
      },
    },
  },
  plugins: [],
};
