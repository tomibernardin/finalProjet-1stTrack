import React, { useState } from 'react'
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import './SearchbarModal.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchContext } from '../../../../../context/SearchContext'
import { PropertyTypeSelect } from '../../components/PropertyTypeSelect'
import { CountSelect } from '../../components/CountSelect'

export const DeskFiltersPanel = ({open, setOpen}) => {

  const {filters, categories, setFilters, applyCategory, reset} = useSearchContext()


  return (
      <>
        <AnimatePresence initial={false} mode="wait">
        {
          open &&
          <motion.div
          className='fixed inset-0 bg-black/25 z-[100]'
          onClick={() => setOpen(false)}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          >

          </motion.div>
          
        }
        </AnimatePresence>
        
        <AnimatePresence initial={false} mode="wait">
        {
          open &&
          <motion.div
          initial={{
            opacity: 0,
            x: '-80%',
            y: '50%'
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: '50%'
          }}
          exit={{
            opacity: 0,
            x: '-80%',
            y: '50%'
          }}
          
          className="fixed bottom-1/2 translate-y-1/2 left-0 origin-center
           bg-white shadow-xl rounded-r-lg z-[100] ">
            <div className='max-h-[60vh] overflow-scroll p-4'>
            <div className='overflow-y-scroll flex flex-col items-start justify-start gap-3'>
              <div className='w-full flex justify-between items-end'>
                <h2 className='text-center text-3xl'>Filters</h2>
                <button
                onClick={() => setOpen(false)}
                className='p-2 border-2 border-violet-700 rounded-full'>
                  <XMarkIcon className='text-violet-700 w-6 h-6' />
                </button>
              </div>
              <h4 className='text-lg font-semibold text-gray-600 mt-2'>By price</h4>
              <div className='flex items-center space-x-2 ml-0.5'>
                <input 
                    type='number'
                    onChange={(e) => setFilters({...filters, price: {...filters.price, min: e.target.value}})}
                    value={filters.price.min}
                    className=' py-2 px-3
                    rounded-lg ring-1 ring-gray-400 grow
                    focus:ring-violet-700 active:ring-violet-700 
                    placeholder:text-gray-600 focus:outline-none'
                    placeholder='$ min. price'
                />
                <span className='text-gray-800 px-4'>to</span>
                <input 
                    type='number' 
                    onChange={(e) => setFilters({...filters, price: {...filters.price, max: e.target.value}})}
                    value={filters.price.max}
                    className=' py-2 px-3
                    rounded-lg ring-1 ring-gray-400 grow
                    focus:ring-violet-700 active:ring-violet-700 
                    placeholder:text-gray-600 focus:outline-none'
                    placeholder='$ max. price'
                />
              </div>
              <h4 className='text-lg font-semibold text-gray-600 mt-2'>Category</h4>
              <div className='flex items-center justify-start
              overflow-auto  snap-x snap-mandatory scrollbar-none'>
                  <div className="flex space-x-6 snap-x snap-mandatory">
                  {categories.map((category, i) => (
                      <PropertyTypeSelect
                          key={i}
                          name={category.title}
                          illustration={category.categoryIllustration.url}
                          onClick={() => applyCategory(category.id)}
                          selected={filters?.category === category.id} 
                      />
                      ))}
                  </div>
              </div>
              <div>
                <h5 className='text-lg font-semibold text-gray-600 px-2'>Rooms</h5>
                <CountSelect
                    value={filters.rooms}
                    setValue={(value) => setFilters({...filters, rooms: value})}
                />
                <h5 className='text-lg font-semibold text-gray-600 mt-1 px-2'>Beds</h5>
                <CountSelect 
                    value={filters.beds}
                    setValue={(value) => setFilters({...filters, beds: value})}
                />
                <h5 className='text-lg font-semibold text-gray-600 mt-1 px-2'>Bathrooms</h5>
                <CountSelect
                    value={filters.bathrooms}
                    setValue={(value) => setFilters({...filters, bathrooms: value})}
                />
              </div>
              </div>
            </div>
            <div className='absolute bottom-0 w-full translate-y-full pt-4 left-0 flex justify-center gap-4'>
              <button
              onClick={() => {reset(); setOpen(false);}}
              className='py-3 w-32 bg-white ring-2 ring-violet-700 text-violet-700 font-medium rounded-lg'>
                Reset
              </button>
              <button
              onClick={() => setOpen(false)}
              className='py-3 w-32 ring-2 ring-violet-700 bg-violet-700 text-white font-medium rounded-lg'>
                Apply
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export const DeskFiltersButton = ({ setOpen, open }) => {
  return (
    <button
    onClick={() => setOpen( !open)}
    className='px-3 py-2 rounded-lg 
    flex items-center
    bg-violet-700
    text-white font-semibold shadow-md focus:outline-none'
  >
    <AdjustmentsHorizontalIcon className='w-6 h-6 ' />
    <p className='mx-2'>Filter</p>
  </button>
  )
}

