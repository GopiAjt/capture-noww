/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Adjust paths to your Vue components
  ],
  // Disable Tailwind's preflight (base reset) to avoid clobbering
  // component library styles (e.g., PrimeVue). If you still want
  // Tailwind's base utilities, you can keep @tailwind base in your
  // CSS but this prevents the global reset that alters component
  // styling. Alternatively, you can selectively enable/override
  // preflight rules in a scoped manner.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {}, // Add any theme customizations here
  },
  plugins: [
    require('tailwindcss-primeui'), // Add this line if using the plugin
  ],
};