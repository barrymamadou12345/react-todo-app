/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/avatar.png')",
      },
      colors: {
        primary: "#5B483D",
        orange: "#e5930f",
        noir: "#000000",
        blanc: "#FFFFFF",
        rouge: "#ff0000",
        bleu: "#2200e5",
        gris: "#757575",
        maron: "#ecd0d0e8",
        vr: "#00B38A",
        rg: "#C24A76",
        bl: "#072967",
        gr: "#AAAABC",
        mr: "#412728c9",
        blc: "#F8F9ff",
        grc: "#ECF1FF",
        vert: "#009688",
        lien: "#FF9800",
        couleurFond: "#D2CECE",
        primary: "#009688",
        url: "#08887C",
        carrer: "#1CB4A5",
      },
      screens: {
        xs: "250px",
        xlm: "1780px",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        bounce: "bounce 1s infinite",
      },
    },
  },
  plugins: [],
};
