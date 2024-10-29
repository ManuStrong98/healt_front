/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'htc-black': '#0D1321',
        'htc-blue': '#3E5C76',
        'htc-lightblue': '#748CAB',
        'htc-white': '#E8E9EB',
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
