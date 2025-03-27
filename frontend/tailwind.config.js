/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-01": "#F3DC98",
        "yellow-02": "#F6E6B6",
        "yellow-03": "#F6EDCF",
        "yellow-04": "#FAF6E9",

        "orange-01": "#EFAA56",
        "orange-02": "#F5BD69",
        "orange-03": "#FFDFAE",

        "green-01": "#3F905B",
        "green-02": "#62B27E",
        "green-03": "#6CB686",
        "green-04": "#CEE7CF",

        "blue-01": "#779DE7",
        "blue-02": "#8CA9E3",
        "blue-03": "#EBF3FF",

        "purple-01": "#6A6DB0",
        "purple-02": "#D3C2F3",
        "purple-03": "#F1F1FF",

        "brown-01": "#573926",
        "brown-02": "#785226",
        "brown-03": "#9F6F34",
        "brown-04": "#EBC57A",

        "cream-01": "#FFFBE7",

        "shade-03": "#AEAEAE",

        "white-01": "#FFFFFF",
        "white-02": "#F6F6F6",

        "black-01": "#000000",

        "neutral-800": "#1F1F1F",
        "neutral-700": "#414141",
        "neutral-600": "#545454",
        "neutral-550": "#72777A",
        "neutral-500": "#A2A2A2",
        "neutral-400": "#CACACA",
        "neutral-300": "#E1E1E1",
        "neutral-200": "#EEEEEE",
        "neutral-100": "#F5F5F5",
        "neutral-50": "#FAFAFA",
        "neutral-0": "#FAFBFE",

        "input-icon": "#9A9A9A",

        danger: "#E04B4B",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      backgroundImage: {
        assessment: "url('/icons/bg-assessment.svg')",
        "artikel-1": "url('/icons/bg-artikel-1.svg')",
        "artikel-2": "url('/icons/bg-artikel-2.svg')",
        "artikel-3": "url('/icons/bg-artikel-3.svg')",
        "students-module":
          "url('/icons/bg-students-module.svg'), linear-gradient(to bottom, rgba(246, 237, 207, 0.5), rgba(243, 220, 152, 0.75))",
        logo: "url('/icons/bg-logo.svg')",
        "logo-blank": "url('/icons/bg-logo-blank.svg')",
        "logo-assessment": "url('/icons/bg-logo-assessment.svg')",
      },
      boxShadow: {
        input: "0 0 0 1px #E3E5E5",
        "input-focus": "0 0 0 1.5px #A2A2A2",
        "input-error": "0 0 0 1px #F43518",
        "input-focus-error": "0 0 0 1.5px #F43518",
      },
      dropShadow: {
        "face-01": "0 10px 20px rgba(251, 213, 100, 1)",
        "face-02": "0 10px 20px rgba(134, 219, 93, 1)",
        "face-03": "0 10px 20px rgba(84, 84, 84, 0.5)",
        "face-04": "0 10px 20px rgba(246, 179, 79, 1)",
        "face-05": "0 10px 20px rgba(236, 105, 105, 1)",

        fab: "0 5px 10px rgba(246, 207, 173, 1)",
      },
      animation: {
        popUp:
          "popUp 0.5s ease forwards, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        popUp: {
          "0%": { transform: "scale(0)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

