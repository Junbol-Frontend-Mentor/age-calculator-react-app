// src/App.jsx
import { useState, useEffect } from 'react'; // Import React and hooks for managing state and effects
import { Box, Button, Flex, Image, Divider, Text } from '@chakra-ui/react'; // Import Chakra UI components for styling
import InputField from './components/InputField'; // Import the InputField component
import AgeDisplay from './components/AgeDisplay'; // Import the AgeDisplay component
import useUserContext from './hooks/useUserContext'; // Import the custom hook to use UserContext
import arrowIcon from './assets/images/icon-arrow.svg'; // Adjust the path as needed
import backgroundImage from './assets/images/birthday_party.webp'; // Import the background image

// Main App component
function App() {
  // State for day, month, and year input fields
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // State for calculated age (years, months, days)
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  // State for input validation errors
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });

  // Get user data from UserContext
  const { users } = useUserContext();

  // Regular expressions for input validation
  const dayPattern = /^(0[1-9]|[12][0-9]|3[01])$/; // Pattern for validating day input
  const monthPattern = /^(0[1-9]|1[0-2])$/; // Pattern for validating month input
  const yearPattern = /^[0-9]{4}$/; // Pattern for validating year input

  // Function to validate individual fields
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === 'day') {
      if (value === '') {
        newErrors.day = 'Input fields cannot be empty';
      } else if (!dayPattern.test(value)) {
        newErrors.day = 'Invalid day: Use two numbers';
      } else {
        newErrors.day = '';
      }
    }

    if (name === 'month') {
      if (value === '') {
        newErrors.month = 'Input fields cannot be empty';
      } else if (!monthPattern.test(value)) {
        newErrors.month = 'Invalid month: Use two numbers';
      } else {
        newErrors.month = '';
      }
    }

    if (name === 'year') {
      if (value === '') {
        newErrors.year = 'Input fields cannot be empty';
      } else if (!yearPattern.test(value)) {
        newErrors.year = 'Invalid year: Use four numbers';
      } else {
        newErrors.year = '';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // Function to validate all inputs
  const validateInputs = () => {
    return validateField('day', day) && validateField('month', month) && validateField('year', year);
  };

  // Function to calculate age based on birth date
  const calculateAge = (birthDate) => {
    const today = new Date(); // Get today's date
    const birthDateObj = new Date(birthDate); // Create a date object from the birth date
    let years = today.getFullYear() - birthDateObj.getFullYear(); // Calculate the difference in years
    let months = today.getMonth() - birthDateObj.getMonth(); // Calculate the difference in months
    let days = today.getDate() - birthDateObj.getDate(); // Calculate the difference in days

    // Adjust for negative days
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Return the calculated age
    return { years, months, days };
  };

  // Function to animate the numbers
  const animateNumber = (element, finalValue, duration) => {
    let startValue = 0; // Initial value
    let startTime = null; // Variable to store the start time

    // Function to update the number during each animation frame
    const updateNumber = (currentTime) => {
      if (!startTime) startTime = currentTime; // Set the start time if it's not already set
      const elapsedTime = currentTime - startTime; // Calculate elapsed time
      const progress = Math.min(elapsedTime / duration, 1); // Calculate progress as a fraction (0 to 1)
      const currentValue = Math.floor(progress * finalValue); // Calculate current value based on progress
      element.innerHTML = currentValue; // Update the element's inner HTML to the current value
      if (progress < 1) {
        // If the animation is not yet complete
        requestAnimationFrame(updateNumber); // Request the next animation frame
      }
    };

    // Start the animation
    requestAnimationFrame(updateNumber);
  };

  // Use effect to trigger animations when age changes
  useEffect(() => {
    const yearsDiv = document.getElementById('years');
    const monthsDiv = document.getElementById('months');
    const daysDiv = document.getElementById('days');

    if (yearsDiv && monthsDiv && daysDiv) {
      animateNumber(yearsDiv, age.years, 2000); // 2 seconds duration
      animateNumber(monthsDiv, age.months, 2000);
      animateNumber(daysDiv, age.days, 2000);
    }
  }, [age]);

  // Handle calculate button click
  const handleCalculateClick = () => {
    if (!validateInputs()) return; // Validate inputs before calculating age
    const birthDate = `${year}-${month}-${day}`; // Construct birth date string
    setAge(calculateAge(birthDate)); // Calculate and set the age
  };

  // Handle user name click
  const handleUserClick = (user) => {
    // Clear the error state
    setErrors({ day: '', month: '', year: '' }); // ✅ Clear the errors when user clicks on a user
    const [year, month, day] = user.birthdate.split('-'); // Split the birthdate string
    setDay(day);
    setMonth(month);
    setYear(year);
    setAge(calculateAge(user.birthdate)); // Calculate and set the age for the selected user
  };

  return (
    <Box width="100vw" display="flex" flexDirection="column" minHeight="100vh">
      <Box
        width="100%"
        height="50rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        flex="1 0 auto"
        bg="lightgrey"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
          opacity="0.2" // Adjust the opacity as needed
          zIndex="0"
        />
        <Box
          width="25rem"
          height="42rem"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          p="1.2rem"
          borderRadius="25px 25px 30% 25px"
          mb="4rem"
          mt="2rem"
          bg="rgba(10, 40, 20, 0.8)" // Background for the inner box
          boxShadow="lg"
        >
          <Flex
            color="red"
            width="100%"
            bg="black"
            justifyContent="center"
            fontSize="2.5rem"
            borderRadius="5px"
            fontWeight="bold"
            mb="2rem"
          >
            Age Calculator
          </Flex>
          <Flex mb="3rem" width="100%" maxHeight="14rem" justifyContent={'space-between'} bg="black" p="1rem"   borderRadius="5px">
            <InputField
              label="DAY"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onBlur={(e) => validateField('day', e.target.value)}
              error={errors.day}
            />
            <InputField
              label="MONTH"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onBlur={(e) => validateField('month', e.target.value)}
              error={errors.month}
            />
            <InputField
              label="YEAR"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onBlur={(e) => validateField('year', e.target.value)}
              error={errors.year}
            />
          </Flex>
          <Flex justifyContent="center" alignItems="center" position="relative" mb="3rem" width="100%">
            <Divider width="20rem" border="2px solid" borderColor="white" mx="auto" />
            <Button
              onClick={handleCalculateClick}
              bg="green"
              _hover={{ bg: 'red.500' }}
              borderRadius="50%"
              width="4rem"
              height="4rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              zIndex="1"
            >
              <Image src={arrowIcon} alt="Calculate Age" boxSize="1.5rem" />
            </Button>
          </Flex>
          <AgeDisplay age={age} /> {/* Component to display calculated age */}
        </Box>
        <Box zIndex="2">
          {' '}
          {/* 🚩Make sure to add the index 2 otherwise the cursor is not going to work*/}
          <Text fontSize="3rem" fontWeight="bold" mb={4}>
            Users
          </Text>
          {users.map((user) => (
            <Text key={user.id} fontSize="2rem" onClick={() => handleUserClick(user)} cursor="pointer">
              {user.name}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
