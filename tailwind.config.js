/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./about.html", "./services.html", "./contact.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff7ff",
          100: "#dbeeff",
          200: "#bedfff",
          300: "#8fc8ff",
          400: "#58a8f6",
          500: "#2f89dd",
          600: "#1f6fc2",
          700: "#1d5a9d",
          800: "#1d4c81",
          900: "#1f406b"
        },
        accent: {
          50: "#f8fbff",
          100: "#eef5fb",
          200: "#ddeaf7"
        },
        ink: {
          900: "#142033",
          700: "#42506a",
          500: "#66758f"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(20, 32, 51, 0.08)",
        float: "0 24px 70px rgba(47, 137, 221, 0.16)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Georgia", "serif"]
      },
      backgroundImage: {
        "clinic-glow":
          "radial-gradient(circle at top left, rgba(143, 200, 255, 0.22), transparent 34%), radial-gradient(circle at top right, rgba(221, 234, 247, 0.9), transparent 28%), linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)"
      }
    }
  },
  plugins: []
};
