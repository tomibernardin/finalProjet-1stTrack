import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchRoutes, PublicRoutes } from "../../guard/Routes";
import { Footer } from "../../components/partials/footer/Footer";
import { useUserContext } from "../../context/UserContext";
import { UserInfo } from "../../components/login/UserInfo";
import Email from "../../components/login/Email";
import PasswordAndConfirmPasswordValidation from "../../components/login/passwordAndConfirmPassword/PasswordAndConfirmPasswordValidation.jsx";
import axios from "axios";
import { useLoadingViewContext } from "../../context/LoadingViewContext";

export const SignUp = ({setStatus, ...props}) => {

  const { loadDone } = useLoadingViewContext();

  useEffect(() => {
    loadDone()
  }, [])
  

  const regex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
  const navigate = useNavigate();
  // const { register } = useUserContext();
  
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function verifyCredentials () {
    return fields.password.length > 6 && fields.password === fields.confirmPassword && regex.test(fields.email) && fields.firstName.length >= 3 && fields.lastName.length >= 3
  }

  const postUser = async () => {
      try {
        setStatus('LOADING');
         await axios.post(
        `${FetchRoutes.BASEURL}/user/register`,
        {
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email,
          password: fields.password,
          city: { "id" : 1 },
          roles: { "id": 1 }
        })
        //if everything ok
        navigate(PublicRoutes.LOGIN, { state:{
          notification :{
            title: 'Verification sent to your email', 
            description: 'Please verify you account before login.'
          }
        }});


      } catch (error) {
        console.error(error.message);
        navigate(PublicRoutes.REGISTER, { state:{
          error :{
            title: 'Something went wrong', 
            description: 'Please verify your credentials and try again. If the problem persist, contact support.'
          }
        }});
      } finally{ setStatus('IDLE') };
  }
  
  const [validationError, setValidationError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    if(verifyCredentials()){
      postUser();
    }
    if(!verifyCredentials()){
      setValidationError(true)
    }
  }

  return (
    <>
      {props.heading &&
      <>
        <h3 className="text-xl font-thin text-center text-gray-500">Welcome</h3>
        <p className="mt-2 text-lg text-center text-gray-500 ">Create account</p>
      </>
      }
      <form onSubmit={handleSubmit}>
        <UserInfo firstName={fields.firstName} lastName={fields.lastName} setUser={setFields} />
        <Email email={fields.email} setUser={setFields} />
        <PasswordAndConfirmPasswordValidation password={fields.password} confirmPassword={fields.confirmPassword} setUser={setFields}/>
        {validationError && 
        <p className="text-center text-red-400 text-sm">Please check all the fields and try again.</p>}
        <div className="flex items-center justify-center mt-4">
          <button className="w-32 py-3 leading-5 text-white text-lg 
          font-medium transition-colors duration-300 
          transform bg-violet-700 rounded-lg hover:bg-violet-600 
          focus:outline-none" 
          type="submit">Register</button>
        </div>
      </form>     
    </>
  );
};
