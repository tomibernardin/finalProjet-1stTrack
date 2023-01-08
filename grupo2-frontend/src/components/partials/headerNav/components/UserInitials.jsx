import React from 'react'

export const UserInitials = ({initials}) => {
  return (
    <div className='rounded-full w-[50px] h-[50px] bg-violet-300 flex items-center justify-center uppercase'>
        {initials}
    </div>
  )
}
