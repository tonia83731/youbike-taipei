/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        olive: {
          100: "#758650",
        },
        lime: {
          100: "#B5C267",
        },
        lemon: {
          100: "#FFE27C",
        },
        mustard: {
          100: "#E8B634",
        },
        beige: {
          100: "#F8F9F8",
        },
        nude: {
          100: "#C9B6A1",
        },
        dark: {
          100: "#2a3129",
        },
        white: "#ffffff",
        "white-75": "rgb(255, 255, 255, .75)",
      },
      screens: {
        900: "900px",
      },
    },
  },
  plugins: [],
};

// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px