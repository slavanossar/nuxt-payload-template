/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'app.vue',
    'error.vue',
  ],
  theme: {
    colors: {
      transparent: 'rgba(0, 0, 0, 0)',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
    },
    fontFamily: {
      body: [
        'Sample',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {},
  },
  plugins: [],
}
