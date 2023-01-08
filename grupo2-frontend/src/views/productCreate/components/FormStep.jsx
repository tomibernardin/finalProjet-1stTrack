import { CheckIcon, ChevronDownIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export const FormStep = ({title, initial = false, status = null, setStatus, children, validate}) => {
    const [isOpen, setIsOpen] = useState(initial)

    useEffect(() => {
      if (status) { setIsOpen(false) }
    }, [status])
    

    const handleOpen = () => {
        if (status) {
            setStatus(null);
            setIsOpen(true);
        } else { setIsOpen((prev) => !prev) }
    }
    return (
      <article
        className="flex flex-col text-left w-full rounded-lg h-auto grow-0"
      >
        <div 
          className="flex justify-between items-center w-full my-4 cursor-pointer"
          onClick={handleOpen}
        >
          <div className='flex items-center text-xl font-semibold'>
            {status  === null &&
            <div className='bg-yellow-500 border border-yellow-400 w-6 h-6 rounded-full
            flex items-center justify-center mr-2'>
                <ClockIcon className='w-4 h-4 text-white' />
            </div>}
            {status  === true &&
            <div className='bg-green-500 border border-green-400 w-6 h-6 rounded-full
            flex items-center justify-center mr-2'>
                <CheckIcon className='w-4 h-4 text-white' />
            </div>}
            {status  === false &&
            <div className='bg-red-500 border border-red-400 w-6 h-6 rounded-full
            flex items-center justify-center mr-2'>
                <XMarkIcon className='w-4 h-4 text-white' />
            </div>}        
            <p className={status ? 'text-gray-400' : 'text-gray-900'}>{title}</p>
            {status  === true &&
                <PencilIcon className='w-4 h-4 text-gray-400 ml-2' /> 
            }
            </div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              initial={{
                rotate: !isOpen ? 0 : 180,
              }}
              animate={{
                zIndex: 1,
                rotate: !isOpen ? 0 : 180,
                transition: {
                  type: "tween",
                  duration: 0.15,
                  ease: "circOut",
                },
              }}
              exit={{
                zIndex: 0,
                rotate: !isOpen ? 0 : 180,
                transition: {
                  type: "tween",
                  duration: 0.15,
                  ease: "circIn",
                },
              }}
            >
              <ChevronDownIcon className={`${status ? 'text-gray-400' : 'text-gray-900'} w-6 h-6`} />
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence initial={false} mode="wait">
          {isOpen && (
            <motion.div
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
              className='w-full'
            >
                <section className={` p-4 md:p-8
                rounded-xl border-2 ${ status === false ? 'border-red-400' : 'border-violet-500'} bg-white`}>
                    {children}
                    <div className='flex items-center justify-end ml-auto gap-4'>
                        <button className='w-32 py-3 rounded-lg 
                        bg-white border-2 border-violet-700 text-violet-700 font-medium
                        flex items-center justify-center mt-6'>Revert</button>
                        <button
                        onClick={validate} 
                        className='w-32 py-3 rounded-lg 
                        bg-violet-700 text-white font-medium
                        flex items-center justify-center mt-6'>Apply</button>
                    </div>
                </section>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    )
}
