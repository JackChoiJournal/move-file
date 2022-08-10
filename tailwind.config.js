module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  theme: {
    extend: {
      width:{
        '80vw':'80vw',
        '70vw':'70vw',
        '60vw':'60vw',
        '50vw':'50vw',
        '4/5':'80%',
      },
      height:{
        '80vh':'80vh',
        '70vh':'70vh',
        '60vh':'60vh',
        '50vh':'50vh',
        '4/5':'80%',
      },
      inset:{
        '1/10':'10%',
      },
    },
  },
}
