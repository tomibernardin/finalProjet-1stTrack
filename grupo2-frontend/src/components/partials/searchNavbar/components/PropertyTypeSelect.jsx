import React from 'react'

export const PropertyTypeSelect = ({selected, onClick, illustration, name}) => {
  return (
    <div 
    onClick={onClick}
    className='flex items-center space-x-3 py-4 w-24 shrink'
    >
        <div className='flex flex-col items-center justify-center space-y-2 snap-start'>
            <img 
            src={illustration} 
            alt='building_illustration'
            className={`w-24 h-24 transition-all ${selected ? 'saturate-110' : 'filter grayscale contrast-75'}`}
            />
            <p className=' text-gray-800'>{name}</p>
        </div>
    </div>
  )
}
