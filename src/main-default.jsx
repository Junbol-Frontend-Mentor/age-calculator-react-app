import React from 'react';
import ReactDOM from 'react-dom/client';//Imports the ReactDOM library for rendering the React component into the DOM.
import App from './App.jsx';// Imports the root App component.
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(//: Initializes the React root rendering inside the element with id="root". Renders the provided React element(s) into the root container.
  <React.StrictMode>{/* A wrapper to help with highlighting potential problems in an application during development */}
    <App />
  </React.StrictMode>
);
