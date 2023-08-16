/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundColor: {
          darker: '#2f3136',
          card: '#202225'
        },
        screens: {
          xsm: '375px'
        },
        boxShadow: {
          card: 'rgb(204, 204, 204) 0px 0px 4px'
        },
        ringColor: {
          darker: 'rgb(204, 204, 204)'
        },
        textColor: {
          darker: 'rgb(204, 204, 204)'
        }
      },
    },
    plugins: [],
  }