import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; // Imports ChakraProvider for theming
import App from './App.jsx';
import './index.css';
import { UserProvider } from './UserContext.jsx';
import theme from './theme'; // Import the custom theme

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // Initializes the React root rendering inside the element with id="root". Renders the provided React element(s) into the root container.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Imports the ReactDOM library for rendering the React component into the DOM.
// import { ChakraProvider } from '@chakra-ui/react'; // Imports ChakraProvider for theming
// import App from './App.jsx'; // Imports the root App component.
// import './index.css'; // Imports global styles
// import { UserProvider } from './UserContext.jsx'; // Import the UserProvider for context
// import theme from './theme'; // Import the custom theme

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // Initializes the React root rendering inside the element with id="root". Renders the provided React element(s) into the root container.
//   <React.StrictMode>
//     {' '}
//     {/* A wrapper to help with highlighting potential problems in an application during development */}
//     <ChakraProvider theme={theme}>
//       {' '}
//       {/* Provides Chakra UI theming to the entire application */}
//       <UserProvider>
//         {' '}
//         {/* The UserProvider is used to manage and provide user data across the entire application without the need to pass props down through multiple levels (Props Drilling) of the component tree. This is done using React's Context API. The data is fetched from the db.json file using the json-server. */}
//         <App />
//       </UserProvider>
//     </ChakraProvider>
//   </React.StrictMode>
// );
