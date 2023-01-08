import React from 'react'
import { MobileNavModal } from './MobileNavModal'
import { useSearchContext } from '@/context/SearchContext'
import { LocationDatalist } from '../components/LocationDatalist'
import { CollapsableMenu } from '../../../collapsableMenu/CollapsableMenu'
import { Calendar } from '../../../Calendar/Calendar'
import { Counter } from '../../../counter/Counter'
export const MobileNavOpen = ({open, setOpen}) => {

  const {filters, setFilters, reset, handleDates} = useSearchContext()
    
  return (
    
    <MobileNavModal open={open} setOpen={setOpen} >
      <CollapsableMenu
        question='Find locations'
        initial
      >
        <div className='p-2 my-4'>
        <LocationDatalist  origin={filters} setOrigin={setFilters} />
        </div>
      </CollapsableMenu>
      <CollapsableMenu
        question='Search by week'
      >
        <div className='flex items-center justify-center'>
        <Calendar
          startDate={filters.date.from}
          endDate={filters.date.to}
          // setStartDate={handleDateFrom}
          // setEndDate={handleDateTo}
          afterChange={(dateFrom, dateTo) => { handleDates(dateFrom, dateTo)}}
          monthsDisplayed={1}
        /> 
        </div>
      </CollapsableMenu>
      <CollapsableMenu
        question='Guests'
      >
        <div className='flex flex-col items-center justify-center 
        w-full gap-4 max-w-sm mx-auto'>
        <div className='flex items-center justify-between w-full' >
          <p className='text-lg text-gray-700'>Adults</p>
          <Counter
          value={filters.guests.adults} 
          setValue={value => {setFilters({...filters, guests: {...filters.guests, adults: value }})}} 
          />
        </div>
        <div className='flex items-center justify-between w-full' >
          <p className='text-lg text-gray-700'>Children</p>
          <Counter
          value={filters.guests.children} 
          setValue={value => {setFilters({...filters, guests: {...filters.guests, children: value }})}} 
          />
        </div>
        <div className='flex items-center justify-between w-full' >
          <p className='text-lg text-gray-700'>Babies</p>
          <Counter
          value={filters.guests.babies} 
          setValue={value => {setFilters({...filters, guests: {...filters.guests, babies: value }})}} 
          />
        </div>
        </div>

      </CollapsableMenu>
    </MobileNavModal>

    )
}
