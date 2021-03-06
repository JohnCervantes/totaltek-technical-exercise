module.exports = {
  mode: "jit",
  purge: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/*/**.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./components/*/**.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
