import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/montserrat';

// import '@fontsource/montserrat/variable.css';
// import '@fontsource/montserrat/400.css'; // Regular Montserrat font
// import '@fontsource/montserrat/700.css'; // Bold Montserrat font

export const theme = extendTheme({
  colors: {
    brand: {
      light: '#D4F2D3',
      main: '#56BB55',
      dark: '#32703C',
    },
  },
  fonts: {
    heading: "'Montserrat Variable', sans-serif",
    body: "'Montserrat Variable', sans-serif",
  },
});
