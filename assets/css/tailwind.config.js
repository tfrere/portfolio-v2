module.exports = {
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
    applyComplexClasses: true,
  },
  purge: {
    // enabled: process.env.HUGO_ENVIRONMENT === "production",
    enabled: true,
    content: [
      "./layouts/**/*.html",
      "./content/**/*.md",
      "./content/**/*.html",
    ],
  },
  theme: {
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "6rem",
      "8xl": "7rem",
      "9xl": "8rem",
      "10xl": "9rem",
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: "auto",
    },
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
      },
      padding: {
        DEFAULT: "2rem",
        sm: "4rem",
        xl: "6rem",
        lg: "8rem",
        "2xl": "12rem",
      },
    },
    extend: {
      colors: {
        pink: "#F497AF",
        orange: "#F38949",
        yellow: "#FFD526",
        green: "#95D0A9",
        blue: "#82BDC6",
      },
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss-font-inter")({
      importFontFace: false,
      disableUnusedFeatures: false,
    }),
  ],
};
