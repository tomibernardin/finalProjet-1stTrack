import React from "react";
import { useState } from "react";
import {
  userContext,
  UserProvider,
  useUserContext,
} from "../../context/UserContext";
export const UserInfo = ({ firstName, lastName, setUser }) => {
    
  function handleNameChange(e) {
    const nameInputValue = e.target.value.trim();
    const nameInputFieldName = e.target.name;
    setUser((user) => ({
        ...user,
        [nameInputFieldName]: nameInputValue,
    }))
  }
  
  return (
    <>
      <div className="w-full mt-4">
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={handleNameChange}
          className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 
          bg-white border rounded-md focus:border-violet-700 focus:ring-opacity-40 
          focus:outline-none focus:ring focus:ring-violet-700'
          />
      </div>
      <div className="w-full mt-4">
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Last Name"
          onChange={handleNameChange}
          className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 
          bg-white border rounded-md focus:border-violet-700 focus:ring-opacity-40 
          focus:outline-none focus:ring focus:ring-violet-700'
          />
      </div>
    </>
  );
};
