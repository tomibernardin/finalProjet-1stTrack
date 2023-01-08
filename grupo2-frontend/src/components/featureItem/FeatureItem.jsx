import React from 'react'

export const FeatureItem = ({
    icon,
    text,

}) => {
  return (
    <li className='flex items-center gap-4 '>
        <img src={icon} className='w-6 h-6 ' />
        <p className='text-gray-600'>{text}</p>
    </li>
  )
}
