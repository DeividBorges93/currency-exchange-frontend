module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      dropShadow: {
        custom: '-6px 50px 16px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
