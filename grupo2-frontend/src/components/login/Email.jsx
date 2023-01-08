import React from "react";
import { useState } from "react";

function Email({ email, setUser }) {
  const [error, setError] = useState(null);
  
  function emailValidation() {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (!email || regex.test(email) === false) {
      setError("Enter a valid email");
      return false;
    }else{
      setError(null)
      return true;
    }
  }
  function handleChange(e) {
    setUser((user) => {
      return {
        ...user,
        email: e.target.value,
      };
    });
    emailValidation();
  }
  return (
    <div className="w-full mt-4">
      <input
      type="email" 
      name="email" 
      value={email} 
      onChange={handleChange}
      onSubmit={handleChange}
      placeholder="Email"
      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 
        bg-white border rounded-md focus:border-violet-700 focus:ring-opacity-40 
        focus:outline-none focus:ring focus:ring-violet-700
        ${error && 'border-red-400'}`}
      />
      <p className="text-ceter text-sm py-1 text-red-400" >{error}</p>
    </div>
  );
}
export default Email;
