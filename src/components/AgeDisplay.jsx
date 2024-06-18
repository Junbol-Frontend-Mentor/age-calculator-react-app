// src/components/AgeDisplay.jsx
import React from 'react'; // Import React
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Box, Heading } from '@chakra-ui/react'; // Import Chakra UI components

// AgeDisplay component for displaying the calculated age
function AgeDisplay({ age }) {
  return (
    <Box
      className="bigTitles"
      w="100%"
      h="12rem"
      display="flex"
      flexDirection="column"
      borderRadius="4px"
      position="relative"
      bg="soft-red"
      transition="height 1.5s ease"
      mb="2rem" 
    >
      {/* Container for age display */}
      <Box className="bigTitles__bigTitle" display="inline-flex" alignItems="center" justifyContent="center">
        {/* Years */}
        <Heading width="5rem" textAlign="right" variant="green" marginRight="0.7rem" id="years" sx={{ animation: 'spinUp 0.5s ease-in-out forwards' }}>
          {age.years}
        </Heading>
        <Heading variant="darkGreen">years</Heading>
      </Box>
      <Box className="bigTitles__bigTitle" display="inline-flex" alignItems="center" justifyContent="center">
        {/* Months */}
        <Heading width="5rem" textAlign="right" variant="green" marginRight="0.7rem" id="months" sx={{ animation: 'spinUp 0.5s ease-in-out forwards' }}>
          {age.months}
        </Heading>
        <Heading variant="darkGreen">months</Heading>
      </Box>
      <Box className="bigTitles__bigTitle" display="inline-flex" alignItems="center" justifyContent="center">
        {/* Days */}
        <Heading width="5rem" textAlign="right" variant="green" marginRight="0.7rem" id="days" sx={{ animation: 'spinUp 0.5s ease-in-out forwards' }}>
          {age.days}
        </Heading>
        <Heading variant="darkGreen">days</Heading>
      </Box>
    </Box>
  );
}

// Define PropTypes for AgeDisplay
AgeDisplay.propTypes = {
  age: PropTypes.shape({
    years: PropTypes.number.isRequired, // 'years' is a required number
    months: PropTypes.number.isRequired, // 'months' is a required number
    days: PropTypes.number.isRequired, // 'days' is a required number
  }).isRequired, // 'age' is a required object with 'years', 'months', and 'days' properties
};

export default AgeDisplay; // Export the AgeDisplay component as default