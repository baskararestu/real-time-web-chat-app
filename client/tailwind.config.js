/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#38bfe0",

          secondary: "#5165db",

          accent: "#0b4b93",

          neutral: "#17141f",

          // "base-100": "#e4e0eb",
          "base-100": "#fafafa",

          info: "#4264d1",

          success: "#1ae6ac",

          warning: "#ad840b",

          error: "#e64b3d",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
