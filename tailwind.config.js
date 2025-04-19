/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#2563EB",
          secondary: "#10B981",
          accent: "#F59E0B",
          muted: "#9CA3AF",
          dark: "#1F2937",
          light: "#F3F4F6",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          display: ["Poppins", "sans-serif"],
        },
        spacing: {
          '128': '32rem',
          '144': '36rem',
          '1/2': '50%',
          'full': '100%',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
        },
        textAlign: {
          justify: 'justify',
          center: 'center',
          left: 'left',
          right: 'right',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  };
  