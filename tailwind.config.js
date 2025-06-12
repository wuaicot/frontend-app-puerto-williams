// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Zen Dots'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "hsl(var(--background) / 0.9)",
        primary: "#2563eb",
        "muted-foreground": "hsl(var(--foreground) / 0.6)"
      },
    },
  },
  variants: {
    extend: {
      flexDirection: ["landscape", "portrait"],
      padding:       ["landscape", "portrait"],
      width:         ["landscape", "portrait"],
      height:        ["landscape", "portrait"],
      justifyContent:["landscape", "portrait"],
      alignItems:    ["landscape", "portrait"],
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
};
