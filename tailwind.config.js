/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
      themes: {
        dark: {
          colors: {
            foreground: '#FFFFFF',
            background: '#0A2647',
            backgroundSecondary: '#001F33',
            primary: '#205295',
            secondary: '#5B9DD7',
          },
        },
        light: {
          colors: {},
        },
      },
    }),
  ],
};
