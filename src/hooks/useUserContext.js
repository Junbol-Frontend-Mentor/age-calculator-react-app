import { useContext } from 'react';
import UserContext from '../UserContext'; // Adjust the path if necessary

// Custom hook to use the UserContext
const useUserContext = () => {
  // This custom hook simplifies the process of accessing the UserContext.Instead of importing useContext and UserContext every time, I can just use this hook.
  return useContext(UserContext);
  // useContext hook is used to access the current context value (which is the 'users' data here).
};

export default useUserContext;
