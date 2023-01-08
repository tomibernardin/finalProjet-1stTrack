import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useSearchContext } from '../../../../context/SearchContext'
import { CalendarDaysIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export const MobileNav = ({onClick}) => {

    const {filters} = useSearchContext();
    

  return (

    <motion.div
        onClick={onClick}
        className='flex items-center w-full'
        initial={{
        height: 0,
        opacity: 0,
        }}
        animate={{
        height: "auto",
        opacity: 1,
        }}
        exit={{
        height: 0,
        opacity: 0,
        }}
    >
        <div 
        className="flex flex-row justify-center items-center
        border border-violet-700 w-12 h-12 rounded-md ml-2"
        >
            <MagnifyingGlassIcon className="w-6 h-6 text-violet-700" />
        </div>
        <div className="flex flex-col justify-center ml-4  px-2 py-4">
            <p className=' font-medium' >Search</p>
            <div className='flex items-center text-sm space-x-1'>
                {filters.location ? 
                <div className='flex items-center'>
                    <MapPinIcon className='w-4 h-4 text-violet-700' />
                    <p className=' text-violet-700' > Location </p>
                </div> :    
                <p className=' text-gray-800' > Any location </p>}
                <span className='w-0.5 h-3 bg-violet-700 rounded-full' />
                {(filters.date.from || filters.date.to) ? 
                <div className='flex items-center'>
                    <CalendarDaysIcon className='w-4 h-4 text-violet-700' />
                    <p className=' text-violet-700' > Date </p>
                </div>:    
                <p className=' text-gray-800' > Any date </p>}
                <span className='w-0.5 h-3 bg-violet-700 rounded-full' />
                {filters.guests.adults ? 
                <div className='flex items-center'>
                    <UserGroupIcon className='w-4 h-4 text-violet-700' />
                    <p className=' text-violet-700' > {filters.guests.adults} </p>
                </div>:    
                <p className=' text-gray-800' > Any guests </p>}
            </div>
        </div>

    </motion.div>
  )
}
