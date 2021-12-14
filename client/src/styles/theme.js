const theme = {
  background: {
    color: 'rgb(50 0 50)', // TO-DO: pasar a RGB
    image: '/assets/background-img.webp' // TO-DO: colocar la url a la imagen de fondo
  },
  colors: {
    primary: 'rgb(50, 0, 50)',
    primary_translucent: 'rgba(45, 0, 50, 0.4)',
    secondary: 'rgb(1, 253, 130)',
    secondary_translucent: 'rgb(1, 253, 130, 0.7)',
    secondary_filter: 'invert(79%) sepia(30%) saturate(3409%) hue-rotate(92deg) brightness(99%) contrast(101%)',
    tertiary: 'rgb(35, 101, 119)',
    tertiary_translucent: 'rgb(35, 101, 119, 0.25)',
    cuaternary: 'rgb(255, 45, 133)',
    cuaternary_filter: 'invert(41%) sepia(86%) saturate(5481%) hue-rotate(319deg) brightness(103%) contrast(104%)',
    cuaternary_translucent: 'rgba(255, 45, 133, 0.9)'
  },
  fonts_family: {
    primary: "'Lato', sans-serif"
  },
  media_queries: {
    xsm: '360px',
    sm: '480px',
    md: '720px',
    lg: '1080px'
  }
};

export default theme;
