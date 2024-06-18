import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  components: {
    Heading: {
      baseStyle: {
        fontStyle: 'italic', // Set the default font style to italic
        fontWeight: '800',
      },
      variants: {
       green: {
          fontSize: '3.5rem', //I I wanted to put in the baseStyle but it dijn't work only here
          color: 'green.200',
        },
        darkGreen: {
          fontSize: '3.5rem', //I I wanted to put in the baseStyle but it dijn't work only here
          color: 'green.400',
          animation: 'spinUp 1s ease-in-out forwards',
        },
      },
    },
  },
});

export default theme;

/* Variants allow you to define consistent styles across your components. This ensures that any component using a particular variant will have the same styles, maintaining uniformity in your application. Variants have a higher specificity compared to base styles. This means that the styles defined in variants are less likely to be overridden by other styles, including inline styles or props. */
