/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.tsx',
    './screens/**/*.{ts,tsx, js, jsx}',
    './components/**/*.{ts,tsx, js, jsx}',
    './hooks/**/*.{ts,tsx, js, jsx}',
    './navigation/**/*.{ts,tsx, js, jsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}