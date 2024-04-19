/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './front/App.tsx',
    './front/screens/**/*.{ts,tsx}',
    './front/components/**/*.{ts,tsx}',
    './front/hooks/**/*.{ts,tsx}',
    './front/navigation/**/*.{ts,tsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}