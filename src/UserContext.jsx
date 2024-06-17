import { createContext, useState, useEffect, useContext } from 'react'; // Import necessary hooks and functions from React

// Create a context for user data
const UserContext = createContext(null); // Initialize context with null as the default value argument.indicating that no default value is provided. This will be overridden by the UserProvider.
// The createContext function is used to create a Context object. 
// This context will be used to share the user data across the application without prop drilling.


// Create a provider component that wraps the application and provides user data
export const UserProvider = ({ children }) => {
  // 'children' represents the nested components that will have access to this context.  ({ children }) Destructure children from props. children represents all components nested inside the UserProvider.

  // State to store user data
  const [users, setUsers] = useState([]); // Initialize 'users' state as an empty array

  // Fetch user data from API on component mount
  useEffect(() => {
    // Using useEffect to perform side-effects, such as fetching data, when the component mounts

    fetch('/api/users') //  is a HTTP GET request by default. Fetching user data from the API endpoint. Sends a GET request to the specified endpoint to retrieve user data.This will return a Promise which will become the 'response' object
      .then((response) => response.json()) // Parsing the JSON response. The Response object contains information about the response, including headers, status, and the body. To read the body of the response, you need to call a method on the Response object, such as .json(), The .json() method reads the body of the response and parses it as JSON, returning a Promise that resolves to the parsed JSON data.
      .then((data) => setUsers(data)) //  The 'data' parameter placeholder contains the parsed JSON data promise. Set the parsed data to the 'users' state. The data here is the parsed JSON from the fetch response. The name 'data' is a placeholder name it could be called 'responseData'. When you chain .then() calls, each .then() receives the resolved value of the Promise returned by the previous .then().
      .catch((error) => console.error('Error fetching users:', error)); // Log any errors  during the fetch process to the console
  }, []); // This cleanup empty dependency array ensures this effect runs only once when the component mounts

  return (
    // Provide the user state data to children components
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider> // Passing 'users' state as the value of UserContext
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  // This hook allows functional components to access the UserContext easily
  return useContext(UserContext); // useContext retrieves the current value of UserContext
};

//-----NOTES ON CREATING THE RESTful API: ---------------------------------------
// fetch('/api/users') Explanation:

// 1. json-server Setup:
//    - json-server is a tool that allows you to create a fake REST API based on a JSON file (db.json).
//    - You start json-server with the command: `json-server --watch db.json --port 5000`.
//    - This command tells json-server to watch the db.json file and serve it on port 5000.

// 2. db.json Structure:
//    - db.json is a simple JSON file that contains your data.
//    - Example structure:
// {
//   "users": [
//     { "id": 1, "name": "John", "age": 30 },
//     { "id": 2, "name": "Lucy", "age": 25 }
//   ]
// }

// 3. API Endpoints Creation:
//    - json-server automatically creates RESTful endpoints based on the structure of db.json.
//    - For the users array in db.json, it creates endpoints like:
// GET /users       : Fetch all users
// GET /users/1     : Fetch the user with ID 1
// POST /users      : Add a new user
// PUT /users/1     : Update the user with ID 1
// DELETE /users/1  : Delete the user with ID 1

// 4. Fetching Data with fetch():
//    - fetch('/api/users') is a shorthand for making an HTTP GET request to the specified endpoint.
//    - When json-server is running, it serves the API endpoints at the root URL (e.g., http://localhost:5000/users).
//    - However, if you have set up a proxy or are serving the API differently, you might use a path like /api/users.

// 5. HTTP GET Request:
//    - fetch('/api/users') sends a GET request to the /api/users endpoint to retrieve user data.
//    - This request will be handled by the json-server, which reads the db.json file and responds with the users data.
//    - fetch returns a Promise that resolves to the Response object representing the response to the request.

// 6. Handling the Response:
//    - You typically handle the response with .then() to process the data.
//    - Example:
/* fetch('/api/users')
.then(response => response.json()) // Parses the JSON from the response body
.then(data => {
  // data now contains the parsed JSON data (the users array from db.json)
  console.log(data); // Logs the user data
})
.catch(error => {
  console.error('Error fetching users:', error); // Handles any errors
}); */

// Summary:
// - The fetch('/api/users') statement initiates a GET request to the /api/users endpoint.
// - This endpoint is created by json-server based on the structure of db.json.
// - The fetch call returns a Promise that resolves to a Response object containing the user data.
// - The .then() method processes the Response object, converting it to JSON and using the data as needed.
