import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const Counter = ({vertical, value, setValue}) => {
  
  const increment = () => {
    if (value < 8 ) setValue(value + 1)
  }

  const decrement = () => {
    if (value > 0 ) setValue(value - 1)
  }
  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'}
    gap-4 items-center justify-center`}
    >
      <button
      onClick={decrement}
      className="p-2 rounded-full bg-violet-700"
      >
        <MinusIcon className='w-4 h-4 text-white' />
      </button>

      <div className={`w-12 h-12 rounded-full flex items-center justify-center   
      border-2  text-large text-gray-600 transition-colors
      ${value > 0 ? 'border-violet-700' : 'border-gray-600 '}`}>
        {value ? (value > 8 ? '8+' : value) : 'Any'}
      </div>
      <button
      onClick={increment}
      className="p-2 rounded-full bg-violet-700"
      >
        <PlusIcon className='w-4 h-4 text-white' />
      </button>
      
    </div>
  )
}
