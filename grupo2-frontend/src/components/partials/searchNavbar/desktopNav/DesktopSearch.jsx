import React from 'react'
import {  ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { MapPinIcon, UserGroupIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { useSearchContext } from '../../../../context/SearchContext'
import DeskSearchbarModal from './components/DeskSearchbarModal'
import { Calendar } from '../../../Calendar/Calendar'
import { LocationDatalist } from '../components/LocationDatalist'
import { AnimatePresence, motion } from 'framer-motion'
import { DeskFiltersButton, DeskFiltersPanel } from './components/DeskFilters'
import { useState } from 'react'
import { Counter } from '../../../counter/Counter'
export const DesktopSearch = ({hide}) => {

  const {filters, 
    categories,
    setFilters, 
    reset, 
    applyCategory,
    handleDates } = useSearchContext()

Date.prototype.formatMMDDYYYY = function(){
  return (this.getMonth() + 1) + 
  "/" +  this.getDate() +
  "/" +  this.getFullYear();
}

const handleDateFormat = date => date? date.formatMMDDYYYY() : 'Any';

const [filtersModal, setFiltersModal ] = useState();

  return (
    <>
    <AnimatePresence initial={false} mode="wait">
    {!hide && 
    <motion.section
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    className='w-screen fixed bottom-4 flex items-center justify-center'> 
      <div
        className={`w-[94vw] max-w-[900px]  
        shadow-xl cursor-pointer h-auto relative
        flex justify-center items-center p-6
        rounded-xl bg-shape-navbar gap-4
        ring-1 ring-violet-700 ring-opacity-5`}
      > 
        <DeskSearchbarModal
          active={filters.location !== null}
          icon={<MapPinIcon className='shrink-0 w-7 h-7 text-violet-700' />}
          text={`${filters.location?.name},  ${filters.location?.country.name}`}
          placeholder="Searching any place"
        >
          <div className='w-96 flex flex-col items-center'>
            <p className='text-violet-700 font-semibold uppercase text-3xl'>Find places</p>
            <p className='mb-4 text-lg text-gray-600'>Select one from the list</p>
          <LocationDatalist flowTop origin={filters} setOrigin={setFilters}  />
          </div>
        </DeskSearchbarModal>
        <DeskSearchbarModal
          active={filters.date.from !== null | filters.date.to !== null}
          icon={<CalendarDaysIcon className='w-7 h-7 text-violet-700' />}
          text={`${handleDateFormat(filters.date.from)} - ${handleDateFormat(filters.date.to)}`}
          placeholder="Any date - any date"
        >

          <Calendar
            startDate={filters.date.from}
            endDate={filters.date.to}
            monthsDisplayed={2}
            afterChange={(dateFrom, dateTo) => { handleDates(dateFrom, dateTo)}}
          />
        </DeskSearchbarModal>

        <DeskSearchbarModal
          active={filters.guests.total > 0}
          icon={<UserGroupIcon className='w-7 h-7 text-violet-700' />}
          text={`${filters.guests.total} guests - no pets`}
          placeholder="Any guests - no pets"
        >
          <div className='flex gap-8 px-10'>
            <div className='flex flex-col gap-4 items-center font-medium' >
              <Counter
              vertical
              value={filters.guests.adults} 
              setValue={value => {setFilters({...filters, guests: {...filters.guests, adults: value }})}} 
              />
              <p className='text-lg text-gray-700'>Adults</p>
            </div>
            <div className='flex flex-col gap-4 items-center font-medium' >
              <Counter
              vertical
              value={filters.guests.children} 
              setValue={value => {setFilters({...filters, guests: {...filters.guests, children: value }})}} 
              />
              <p className='text-lg text-gray-700'>Children</p>
            </div>
            <div className='flex flex-col gap-4 items-center font-medium' >
              <Counter
              vertical
              value={filters.guests.babies} 
              setValue={value => {setFilters({...filters, guests: {...filters.guests, babies: value }})}} 
              />
              <p className='text-lg text-gray-700'>Babies</p>
            </div>
          </div>
        </DeskSearchbarModal>
        <div 
          className="flex flex-row justify-center items-center
          border border-violet-700 w-12 h-12 rounded-md ml-2"
          >
              <MagnifyingGlassIcon className="w-6 h-6 text-violet-700" />
        </div>
        <div className='flex items-center absolute -left-4 z-10 -translate-x-full'>
          <DeskFiltersButton setOpen={setFiltersModal} open={filtersModal} />
          <div className='py-2 px-4 rounded-full ml-4 bg-violet-700'>
          <ArrowPathIcon onClick={() => {reset(); setFiltersModal(false)}} className='text-yellow-500 w-6 h-6' />
          </div>
        </div>
      </div>
    </motion.section>
    }</AnimatePresence>  

    <DeskFiltersPanel open={(filtersModal && !hide)} setOpen={setFiltersModal} />
    </>
  )
}
