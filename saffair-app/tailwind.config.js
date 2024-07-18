/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/**/*.css",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    // Add more file patterns as needed
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#2196BA",
      },
      boxShadow: {
        custom: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      borderWidth: {
        10: "10px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
