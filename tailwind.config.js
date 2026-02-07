const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        grey: {
          0: "#FFF4E6", // Warm white background
          5: "#FFF4E6", // Very light champagne
          10: "#FFEFD5", // Light golden background
          20: "#FFE4B5", // Golden borders
          30: "#FFD700", // Soft gold
          40: "#DAA520", // Goldenrod - icons, secondary text
          50: "#B8860B", // Dark goldenrod - body text
          60: "#996515", // Bronze - headings
          70: "#8B6914", // Dark bronze
          80: "#6B5504", // Very dark gold
          90: "#4A3C02", // Almost black with gold tint
        },
        blue: {
          50: "#FFF8DC", // Cornsilk (golden tint)
          100: "#FAEBD7", // Antique white
          200: "#F5DEB3", // Wheat
          300: "#DEB887", // Burlywood
          400: "#D2B48C", // Tan
          500: "#BC8F8F", // Rosy brown
          600: "#A0826D", // Medium brown
          700: "#8B7355", // Dark tan
          800: "#6B5D52", // Dark brown
          900: "#4E4540", // Very dark brown
        },
        violet: {
          50: "#FFF8DC",
          60: "#DAA520", // Goldenrod for active states
          100: "#FAEBD7",
          200: "#F5DEB3",
          300: "#DEB887",
          400: "#D2B48C",
          500: "#BC8F8F",
          600: "#A0826D",
          700: "#8B7355",
          800: "#6B5D52",
          900: "#4E4540",
        },
        brand: {
          slate: {
            dark: "#8B6914", // Dark bronze
            medium: "#DAA520", // Goldenrod
          },
          zinc: {
            100: "#FFEFD5", // Light golden
            400: "#FFD700", // Gold
            600: "#DAA520", // Goldenrod
            900: "#996515", // Bronze
          },
        },
        // Medusa UI color overrides - these control bg-ui-*, text-ui-*, border-ui-* classes
        ui: {
          bg: {
            base: "#FFEFD5", // Warm white backgrounds
            subtle: "#FFF4E6", // Very light champagne
            field: "#FFFBF5", // Input fields
            "field-hover": "#FFF4E6", // Input hover
            disabled: "#FFEFD5", // Disabled backgrounds
            interactive: "#020202ff", // Interactive elements (goldenrod)
            modal: "rgba(139, 105, 20, 0.5)", // Modal/menu background (dark bronze with opacity)
          },
          fg: {
            base: "#4A3C02", // Almost black with gold tint
            subtle: "#B8860B", // Dark goldenrod
            muted: "#DAA520", // Goldenrod
            disabled: "#FFD700", // Soft gold
            interactive: "#996515", // Bronze for links
            "on-color": "#FFFBF5", // Text on dark backgrounds (warm white)
          },
          border: {
            base: "#FFE4B5", // Golden borders
            strong: "#FFD700", // Soft gold borders
            interactive: "#DAA520", // Goldenrod interactive
          },
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
