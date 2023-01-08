import { useState } from "react";
import PasswordInputField from "./PasswordInputField";
import ConfirmPasswordInputField from "./ConfirmPasswordInputField";
function PasswordAndConfirmPasswordValidation({password, confirmPassword, setUser}) {
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    setUser((user) =>({
        ...user,
        [passwordInputFieldName]: passwordInputValue,
      }));
  };

  const handleValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{7,}/;

      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);

      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } /*else if(!uppercasePassword){
            errMsg="At least one Uppercase";
    }else if(!lowercasePassword){
            errMsg="At least one Lowercase";
    }else if(!digitsPassword){
            errMsg="At least one digit";
    }else if(!specialCharPassword){
            errMsg="At least one Special Characters";
    }*/ else if (!minLengthPassword) {
        errMsg = "Password needs a minimum of 7 characters";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }

    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        confirmPassword.length > 0)
    ) {
      if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords don't match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };
  return (
    <>
      <PasswordInputField
        handlePasswordChange={handlePasswordChange}
        handleValidation={handleValidation}
        passwordValue={password}
        passwordError={passwordError}
      />
      <ConfirmPasswordInputField
        handlePasswordChange={handlePasswordChange}
        handleValidation={handleValidation}
        confirmPasswordValue={confirmPassword}
        confirmPasswordError={confirmPasswordError}
      />
    </>
  );
}

export default PasswordAndConfirmPasswordValidation;
