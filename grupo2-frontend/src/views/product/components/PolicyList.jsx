import React from 'react'

export const PolicyList = ({
  title, list
}) => {
  return (
    <div className='flex flex-col items-start justify-start'>
      <p className='mb-6 text-xl md:text-2xl text-violet-700 font-thin underline underline-offset-8'>{title}</p>
      <ul className='flex flex-col items-start justify-start 
      gap-2 md:gap-4'
      >
      {list.map((item, i) => (
        <li className='flex items-start text-gray-700 max-w-xs w-full' key={i} >
          <span className='mr-2 w-4 h-1 mt-[10px] rounded-full bg-violet-700 shrink-0' />
          <p className=''>{item.name}</p>
          
        </li>
      ))}
      </ul>
    </div>
  )
}
