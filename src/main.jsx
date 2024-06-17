import React from 'react';
import ReactDOM from 'react-dom/client';//Imports the ReactDOM library for rendering the React component into the DOM.
import App from './App.jsx';// Imports the root App component.
import './index.css';
import { UserProvider } from './UserContext.jsx'; // Import the UserProvider for context

ReactDOM.createRoot(document.getElementById('root')).render(//: Initializes the React root rendering inside the element with id="root". Renders the provided React element(s) into the root container.
  <React.StrictMode>{/* A wrapper to help with highlighting potential problems in an application during development */}
   <UserProvider> {/* The UserProvider is used to manage and provide user data across the entire application without the need to pass props down through multiple levels (Props Drilling) of the component tree. This is done using React's Context API. The data is fetched from the db.json file using the json-server.*/}
      <App />
    </UserProvider>
  </React.StrictMode>
);
