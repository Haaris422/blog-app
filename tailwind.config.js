module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-down': 'slide-down 0.5s ease-out forwards',
      },
      keyframes: {
        'slide-down':{
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        }
      },
      
      fontFamily: {
        typewriter: ["var(--font-typewriter)"],
        girassol: ["var(--font-girassol)"]
      },
    },
  },
  plugins: [],
};
