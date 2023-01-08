function PasswordInputField({
  handleValidation,
  handlePasswordChange,
  passwordValue,
  passwordError,
}) {
  return (
    <div className="w-full mt-4">
      <input
        type="password"
        value={passwordValue}
        onChange={handlePasswordChange}
        onKeyUp={handleValidation}
        name="password"
        placeholder="Password"
        className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 
        bg-white border rounded-md focus:border-violet-700 focus:ring-opacity-40 
        focus:outline-none focus:ring focus:ring-violet-700
        ${passwordError && 'border-red-400'}`}
      />
      <p className="text-ceter text-sm py-1 text-red-400" >{passwordError}</p>
    </div>
  );
}

export default PasswordInputField;
