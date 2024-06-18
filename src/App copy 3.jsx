import { useState } from 'react';
import { Box, Button, Flex, Image, Divider, Text } from '@chakra-ui/react';
import InputField from './components/InputField';
import AgeDisplay from './components/AgeDisplay';
import useUserContext from './hooks/useUserContext';
import arrowIcon from './assets/images/icon-arrow.svg';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });
  const { users } = useUserContext();

  const dayPattern = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthPattern = /^(0[1-9]|1[0-2])$/;
  const yearPattern = /^[0-9]{4}$/;

  // Function to validate a single field ✅
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
    return newErrors;
  };

  // Function to validate all inputs ✅
  const validateInputs = () => {
    let valid = true;
    let allErrors = {};

    allErrors = validateField('day', day);
    if (allErrors.day) valid = false;

    allErrors = validateField('month', month);
    if (allErrors.month) valid = false;

    allErrors = validateField('year', year);
    if (allErrors.year) valid = false;

    setErrors(allErrors);
    return valid;
  };

  // Function to calculate age ✅
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

  // Handle calculate button click ✅
  const handleCalculateClick = () => {
    if (!validateInputs()) return;
    const birthDate = `${year}-${month}-${day}`;
    setAge(calculateAge(birthDate));
  };

  // Handle user name click ✅
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
              validateField('day', e.target.value); // Validate on change
            }}
            onBlur={(e) => validateField('day', e.target.value)} // Validate on blur
            error={errors.day}
          />
          <InputField
            label="MONTH"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              validateField('month', e.target.value); // Validate on change
            }}
            onBlur={(e) => validateField('month', e.target.value)} // Validate on blur
            error={errors.month}
          />
          <InputField
            label="YEAR"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              validateField('year', e.target.value); // Validate on change
            }}
            onBlur={(e) => validateField('year', e.target.value)} // Validate on blur
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
