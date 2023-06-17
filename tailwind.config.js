/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xl: "62pt",
        default: "20pt",
        title: "48pt",
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
      colors: {
        primary: "#FBBF24",
        hover: "#D97706",
        background: "#FDE68A",
        "card-background": "#FFFFFF",
        text: "#0F172A",
        "secondary-text": "#94A3B8",
        "empty-field": "#F1F5F9",
        "filled-heart": "#EF4444",
      },
    },
  },
  plugins: [],
};
