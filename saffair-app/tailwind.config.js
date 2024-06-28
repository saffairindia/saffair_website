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
      customBlue: '#2196ba',
    },},
  },
  plugins: [require("flowbite/plugin")],
  
};
