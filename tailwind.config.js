const tailwindConfig = {
  theme: {
    extend: {
       fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        openSans: ['Open Sans','sans-serif'],
      },
    },
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
};

export default tailwindConfig;
