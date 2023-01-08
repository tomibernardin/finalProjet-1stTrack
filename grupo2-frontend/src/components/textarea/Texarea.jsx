import React from 'react'

export const Textarea = ({
    label,
    tag,
    id,
    name,
    placeholder,
    value,
    onChange,
    disabled,
    className,
    children,
    errorMessage,
    error,
    ...props
}) => {

  return (
    <div className={`flex flex-col-reverse items-start font-primary group w-full relative ${className}`}>
        {children}
        {errorMessage && 
        <p className='text-sm text-red-400 ml-2 mt-2'>{errorMessage}</p>}
        <textarea
        className={`peer block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 
        bg-white border rounded-md focus:border-violet-700 focus:ring-opacity-40 
        focus:outline-none focus:ring focus:ring-violet-700 resize-none
        ${error && 'border-red-400'}`}
        id={id}
        name={name ? name : id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...props}
        />
        
        {label && 
        <label
            htmlFor={id}
            className="ml-1 peer-focus:text-violet-700 text-gray-800 text-lg"
        >
            {label}
        </label>}
  </div>
  )
}
