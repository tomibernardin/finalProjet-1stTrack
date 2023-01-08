import React from 'react'
import { motion } from 'framer-motion'
import { useSearchContext } from '@/context/SearchContext'
import { CheckIcon } from '@heroicons/react/24/solid'

export const MobileNavModal = ({open, setOpen, children}) => {

    const {filters, setFilters, reset} = useSearchContext()
    // const {category, price, date, guests, location} = filters
  
  return (
    
    <motion.div
        className='w-full h-full overflow-hidden relative
        rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-[10rem]'
        initial={{
            height: 0,
            opacity: 0,
        }}
        animate={{
            height: "auto",
            opacity: 1,
            transition: {
               height: {
                    duration: 0.4,
               },
                opacity: {
                    duration: 0.25,
                    delay: 0.15,
              },
            },
        }}
        exit={{
            height: 0,
            opacity: 0,
            transition: {
               height: {
                  duration: 0.4,
              },
               opacity: {
                   duration: 0.25,
               },
           },
        }}
    >
        <div className='flex flex-col items-start w-full overflow-y-auto scrollbar-none h-screen max-h-[70vh]'>
            <div className='w-full px-4 py-4 pb-20'>
                
                {children}
                <button
                    onClick={reset}
                    className='px-3 py-1 p-2 rounded-lg 
                    absolute bottom-2 left-2 z-10
                    bg-white text-violet-700 border-2 border-violet-700 font-semibold'
                >
                    Clear all
                </button>
                <button
                    onClick={() => setOpen(false)}
                    className='w-20 h-20 rounded-t-full 
                    fixed bottom-0 left-1/2 -translate-x-1/2
                    flex flex-col items-center justify-center z-10
                    bg-violet-700 text-white'
                >
                    <CheckIcon className='w-10'/>
                    <p className='font-meidum'>Apply</p>
                </button> 
            </div>
        </div>
        <div className='w-full h-16 absolute left-0
        bottom-0 bg-gradient-to-t from-white via-white/60 to-white/0' />
        
    </motion.div>

    )
}
