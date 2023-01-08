import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext(null);

const useUserContext = () => useContext(userContext);

function UserProvider({ children }) {
  
  const navigate = useNavigate()

// Retrieve the object from storage
const retrievedObject = localStorage.getItem('userSession');

  const [user, setUser] = useState(JSON.parse(retrievedObject));
  
  function register(user){
    setRegisteredUser(user)
  }

  function login(data) {
    localStorage.setItem('userSession', JSON.stringify(data));

    setUser(data);
  }
  function logout() {
    setUser(null);
    localStorage.removeItem('userSession')
    navigate('/')
  }
  function update(newUser) {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUser,
    }));
  }

  return (
    <userContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        update,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
export { userContext, UserProvider, useUserContext };
