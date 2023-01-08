
import React, { useState } from 'react'
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { MobileNav, MobileNavOpen, MobileNavFilters } from './index'

export const MobileSearch = ({hide}) => {
    const [open, setOpen] = useState(false)
    const [filtersTab, setFiltersTab] = useState(false)

    return ( 
      <AnimatePresence initial={false} mode="wait" >
      {!hide && 
      <motion.section
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className='w-screen fixed bottom-4 flex items-center justify-center'>
        <div
          className={`transition-all w-[94vw] max-w-[600px]  
          shadow-xl cursor-pointer h-auto relative
          flex flex-col justify-start items-start
          rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-[10rem]
          bg-shape-navbar `}
        > 
            <AnimatePresence initial={false} mode="wait" >
              {(!open && !filtersTab) &&  
                  <MobileNav 
                  onClick={() => {if (!open) {setOpen(true)}}} 
                  /> 
              }
            </AnimatePresence>
            <AnimatePresence initial={false} mode="wait" >
              {open &&  
                  <MobileNavOpen open={open} setOpen={setOpen} /> 
              }
            </AnimatePresence>
            <AnimatePresence initial={false} mode="wait" >
              {filtersTab &&  
                  <MobileNavFilters open={filtersTab} setOpen={setFiltersTab} />
              }
            </AnimatePresence>
  
            <button 
              onClick={() => {if ( !open && !filtersTab){ 
                setFiltersTab(true)} 
                else {
                    setOpen(false); 
                    setFiltersTab(false)
                }}}
              className='w-12 h-12 p-2 rounded-full z-10
              bg-violet-700 shadow-lg shadow-violet-400/20
              absolute bottom-0 right-0'
            >
              {open | filtersTab ?
                <XMarkIcon className='text-white'/> :
              <AdjustmentsHorizontalIcon className='text-white'/>
              }
            </button>
            
            <AnimatePresence initial={false} mode="wait">
                
              {(open | filtersTab) &&  
                <motion.h3
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                  className='absolute -top-2 left-1 -translate-y-full
                  text-white drop-shadow-md font-medium text-4xl'
                >
                  {open ? 'Search' : 'Filters'}
                </motion.h3>
              }
              
            </AnimatePresence>
        </div>
      </motion.section>
      }</AnimatePresence>
    )
  }
