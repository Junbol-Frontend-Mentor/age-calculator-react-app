import React, { useState, useEffect } from 'react'; // Import React and hooks
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'; // Import Chakra UI components

// InputField component for rendering an input field with validation
function InputField({ label, value, onChange, onBlur, error }) {
  const [isValid, setIsValid] = useState(false);

  // Check if the field is valid
  useEffect(() => {
    if (!error && value) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error} width="6.5rem" mb={3} >
      {/* FormControl for managing validation state */}
      <FormLabel
        className="dateTopRow__label"
        color={error ? 'red' : 'white'} // Change label color based on error
        fontWeight="700" // Ensure label font weight is 700
        width="4rem"
      >
        {label}
      </FormLabel>
      <Input
        className="dateTopRow__inputField"
        placeholder={label === 'DAY' ? 'DD' : label === 'MONTH' ? 'MM' : 'YYYY'}
        // If label is 'MONTH', the placeholder will be 'MM'. For any other value of label, the placeholder will be 'YYYY'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        width="100%"
        height="4rem"
        textAlign="center"
        borderRadius="7px"
        fontWeight="800"
        fontSize="1.4rem"
        lineHeight="1.1"
        color="black"
        backgroundColor="white"
        border="3px solid"
        _hover={{ borderColor: 'purple' }}
        _focus={{ outline: 'none', borderColor: 'purple' }}
        _invalid={{ borderColor: 'red' }} // Style for invalid input
        borderColor={isValid ? 'green' : 'lightgrey'} // ✅Style for valid input
      />
      <FormErrorMessage>{error}</FormErrorMessage> {/* Display error message */}
    </FormControl>
  );
}

// Define PropTypes for InputField
InputField.propTypes = {
  label: PropTypes.string.isRequired, // 'label' is a required string
  value: PropTypes.string.isRequired, // 'value' is a required string
  onChange: PropTypes.func.isRequired, // 'onChange' is a required function
  onBlur: PropTypes.func.isRequired, // 'onBlur' is a required function
  error: PropTypes.string, // 'error' is an optional string
};

export default InputField; // Export the InputField component as default


///----------NOTES on isInvalid -----
/*
isInvalid Prop and its Effect
Purpose of isInvalid:
The isInvalid prop is used by Chakra UI's FormControl component to determine whether the input field should be styled as invalid.
When isInvalid is set to true, Chakra UI applies the _invalid styles to the input field, such as borderColor: 'red', and displays the FormErrorMessage.

Double Negation Operator (!!):
The double negation operator (!!) converts any value to a boolean.
If error is a non-empty string (e.g., 'Invalid input'), meaning an error occurred: !!error will be true.
If error is an empty string or null, !!error will be false.❓yes this is cntradictory but I the explanation for this is bellow

Understanding the Error Logic
When error is a Non-Empty String:

Example: error = 'Invalid input'
!!error converts the non-empty string to true.
isInvalid={!!error} becomes isInvalid={true}, indicating that the input field is invalid.
The input field will be styled with the _invalid styles (e.g., borderColor: 'red').
When error is an Empty String or null:

Example: error = '' or error = null
!!error converts an empty string or null to false.
isInvalid={!!error} becomes isInvalid={false}, indicating that the input field is not invalid.
The input field will not be styled with the _invalid styles.❓yes this is cntradictory, so how the _invlaid turns on if the user leave the field empty? the explanation for this is next

Handling Empty Fields:
If the user leaves a field empty, the system is set the error state to a message like 'Input fields cannot be empty'.
And here it is: 
 // Validate day input
    if (day === '') {
      newErrors.day = 'Input fields cannot be empty';

This message is a non-empty string, so !!error will be true, making the input field invalid.

Connecting App.jsx Logic with InputField.jsx:
In App.jsx, you manage the validation logic and update the errors state.
When the input field is invalid, you set the error state to an appropriate message.
This error state is passed as a prop to InputField.
FormControl uses isInvalid={!!error} to determine whether to apply the invalid styles.
*/
