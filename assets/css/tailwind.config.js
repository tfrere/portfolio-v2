module.exports = {
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
    applyComplexClasses: true,
  },
  purge: {
    content: ["./layouts/index.html"],
  },
  theme: {
    extend: {
      colors: {
        pink: "#F497AF",
        orange: "#F38949",
        yellow: "#FFD526",
        green: "#95D0A9",
        blue: "#82BDC6",
      },
    },
    fontFamily: {
      sans: ["Varela Round", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
  },
  variants: {},
  plugins: [],
};
