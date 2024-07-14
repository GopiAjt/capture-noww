/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Adjust paths to your Vue components
  ],
  theme: {
    extend: {}, // Add any theme customizations here
  },
  plugins: [
    require('tailwindcss-primeui'), // Add this line if using the plugin
  ],
};