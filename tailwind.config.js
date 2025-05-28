module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'hsl(var(--background) / 0.9)',
        primary: '#2563eb',
        'muted-foreground': 'hsl(var(--foreground) / 0.6)'
      }
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
}