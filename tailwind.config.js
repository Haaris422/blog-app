module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-down': 'slide-down 0.5s ease-out forwards',
              typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
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
        },
        
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      
      fontFamily: {
        typewriter: ["var(--font-typewriter)"],
        girassol: ["var(--font-girassol)"]
      },
    },
  },
plugins: [require('@tailwindcss/line-clamp')],
};
