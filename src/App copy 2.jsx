import { useState } from 'react'; // Import React and the useState hook for managing state
import { Box, Button, Image, Flex, Divider, Text } from '@chakra-ui/react'; // Import Chakra UI components for styling
import InputField from './components/InputField'; // Import the InputField component
import AgeDisplay from './components/AgeDisplay'; // Import the AgeDisplay component
import useUserContext from './hooks/useUserContext'; // Import the custom hook to use UserContext
import arrowIcon from './assets/images/icon-arrow.svg'; // Adjust the path as needed

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
  const dayPattern = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthPattern = /^(0[1-9]|1[0-2])$/;
  const yearPattern = /^[0-9]{4}$/;

  // Consolidated validation function for input fields
  const validateField = (field, value) => {
    let newErrors = { ...errors };
    if (field === 'day') {
      if (value === '') {
        newErrors.day = 'Input fields cannot be empty';
      } else if (!dayPattern.test(value)) {
        newErrors.day = 'Invalid day: Use two numbers';
      } else {
        newErrors.day = '';
      }
    }
    if (field === 'month') {
      if (value === '') {
        newErrors.month = 'Input fields cannot be empty';
      } else if (!monthPattern.test(value)) {
        newErrors.month = 'Invalid month: Use two numbers';
      } else {
        newErrors.month = '';
      }
    }
    if (field === 'year') {
      if (value === '') {
        newErrors.year = 'Input fields cannot be empty';
      } else if (!yearPattern.test(value)) {
        newErrors.year = 'Invalid year: Use four numbers';
      } else {
        newErrors.year = '';
      }
    }
    setErrors(newErrors);
    return newErrors; // Return the new errors object
  };

  // Function to validate all inputs
  const validateInputs = () => {
    let valid = true;
    let allErrors = {};

    // Validate day input
    allErrors = validateField('day', day);
    if (allErrors.day) valid = false;

    // Validate month input
    allErrors = validateField('month', month);
    if (allErrors.month) valid = false;

    // Validate year input
    allErrors = validateField('year', year);
    if (allErrors.year) valid = false;

    setErrors(allErrors); // Update the errors state with the latest validation results
    return valid; // Return whether the inputs are valid
  };

  // Function to calculate age based on birth date
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const handleCalculateClick = () => {
    if (!validateInputs()) return;
    const birthDate = `${year}-${month}-${day}`;
    setAge(calculateAge(birthDate));
  };

  const handleUserClick = (user) => {
    const [year, month, day] = user.birthdate.split('-');
    setDay(day);
    setMonth(month);
    setYear(year);
    setAge(calculateAge(user.birthdate));
  };

  return (
    <Box className="App" p={4} maxW="md" mx="auto">
      <Box className="cardContainer" p={3} borderRadius="md" boxShadow="lg" justifyContent="space-between" bg="white">
        <Flex className="dateTopRow" justifyContent="space-between" mb={6}>
          <InputField
            label="DAY"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
              validateField('day', e.target.value);
            }}
            onBlur={(e) => validateField('day', e.target.value)}
            error={errors.day}
          />
          <InputField
            label="MONTH"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              validateField('month', e.target.value);
            }}
            onBlur={(e) => validateField('month', e.target.value)}
            error={errors.month}
          />
          <InputField
            label="YEAR"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              validateField('year', e.target.value);
            }}
            onBlur={(e) => validateField('year', e.target.value)}
            error={errors.year}
          />
        </Flex>
        <Flex justifyContent="center" alignItems="center" position="relative" mb="4rem">
          <Divider borderColor="gray.200" width="20rem" />
          <Button
            onClick={handleCalculateClick}
            bg="purple.500"
            _hover={{ bg: 'red.500' }}
            borderRadius="50%"
            width="4rem"
            height="4rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            zIndex="2"
          >
            <Image src={arrowIcon} alt="Calculate Age" boxSize="1.5rem" />
          </Button>
        </Flex>
        <AgeDisplay age={age} />
        <Divider my={6} mb="3rem" />
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Users
          </Text>
          {users.map((user) => (
            <Text key={user.id} onClick={() => handleUserClick(user)} cursor="pointer">
              {user.name}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;

/*

The errors state is passed as props to the InputField components.❓ how?



You said :  When you pass isInvalid={!!error}, you're telling FormControl to set isInvalid to true if there's an error message. If there's no error message, isInvalid is false." "

 " "If error is a non-empty string, !!error will be true." I dont understand this. Why will be set to true if there is no error????
 
 
 If error is an empty string or null, !!error will be false.
 but you said : 
 */
