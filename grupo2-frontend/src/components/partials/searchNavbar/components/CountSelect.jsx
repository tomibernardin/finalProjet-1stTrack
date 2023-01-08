import React from 'react'

export const CountSelect = ({value, setValue}) => {
  return (
    <div 
    className='flex items-center justify-start scrollbar-none
    pt-4 pb-6 px-2 overflow-auto snap-x snap-mandatory'
    >
        <div className="flex gap-2 snap-x snap-mandatory scrollbar-none">
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === null ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(null)}>Any</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === 1 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(1)}>1</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === 2 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(2)}>2</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === 3 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(3)}>3</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === 4 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(4)}>4</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === 5 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(5)}>5</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === 6 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(6)}>6</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value === 7 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(7)}>7</button>
            <button 
            className={`w-10 py-2 rounded-xl snap-start transition-all
            ${value >= 8 ? 'bg-violet-700 text-white' : 'border border-gray-600 text-gray-600'}`}
            onClick={()=>setValue(8)}>8+</button>
        </div>
    </div>
  )
}
