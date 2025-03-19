/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        themeBackground: "#F5F5F5", // Fondo claro y neutro
        themePrimary: "#1E3A8A", // Azul cobalto para títulos
        themeSecondary: "#6B7280", // Gris neutro para textos secundarios
        themeText: "#374151", // Gris oscuro para textos generales
        accent: "#E11D48", // Rojo vibrante para íconos de favorito y elementos destacados
      },
    },
  },
  plugins: [],
};
