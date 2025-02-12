/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-red-500", "text-white", "p-4", "text-xl", "shadow-lg",
    "bg-gray-100", "text-gray-800", "w-full", "max-w-3xl"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
