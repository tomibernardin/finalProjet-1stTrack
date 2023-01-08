import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Calendar } from '../../../components/Calendar/Calendar'
import { LocationDatalist } from '../../../components/partials/searchNavbar/components/LocationDatalist'
import DeskSearchbarModal from '../../../components/partials/searchNavbar/desktopNav/components/DeskSearchbarModal'
import { useSearchContext } from '../../../context/SearchContext'
import useWindowDimensions from '../../../hooks/useWindowDimensions'

export const HeroSearchSection = () => {

  const {filters, setFilters} = useSearchContext();

  const initialSate = {
    location: null,
      date: {
        from: null,
        to: null,
    }
  }

  const [aux, setAux] = useState(initialSate);

  const handleDates = ( dateFrom, dateTo )=> {
    setAux({...aux, date:{ from:dateFrom, to:dateTo}})
  }
  
  const { width } = useWindowDimensions();

  Date.prototype.formatMMDDYYYY = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() +
    "/" +  this.getFullYear();
  }
  
  const handleDateFormat = date => date? date.formatMMDDYYYY() : 'Any';

  return (
    <div className='w-full flex flex-col items-center justify-center 
    relative pt-10 pb-28 md:pb-12'>
        <h1 className='text-xl md:text-2xl lg:text-3xl 
        text-white font-thin mb-8 text-center drop-shadow-xl' >
            Find that place that feels like <span className="font-bold uppercase hover:text-violet-200 transition-all">home</span>
        </h1>
        <div
        className={`max-w-[900px] z-10
        shadow-2xl cursor-pointer h-auto absolute bottom-0 translate-y-1/2
        flex flex-col md:flex-row justify-center items-ce nter p-6
        rounded-xl bg-shape-navbar gap-4
        ring-1 ring-violet-700 ring-opacity-5`}
      > 

        <DeskSearchbarModal
          flowBottom
          active={aux.location !== null}
          icon={<MapPinIcon className='shrink-0 w-7 h-7 text-violet-700' />}
          text={`${aux.location?.name},  ${aux.location?.country.name}`}
          placeholder="Searching any place"
          panelClassName="md:ml-10 lg:ml-0"
        >
          <div className='w-[80vw] max-w-sm flex flex-col items-center'>
            <p className='text-violet-700 font-thin uppercase text-3xl'>Find places</p>
            <p className='mb-4 text-lg text-gray-600'>Select one from the list</p>
          <LocationDatalist origin={aux} setOrigin={setAux} />
          </div>
        </DeskSearchbarModal>
        <DeskSearchbarModal
          flowBottom
          active={aux.date.from !== null | aux.date.to !== null}
          icon={<CalendarDaysIcon className='w-7 h-7 text-violet-700' />}
          text={`${handleDateFormat(aux.date.from)} - ${handleDateFormat(aux.date.to)}`}
          placeholder="Any date - any date"
        >
          <Calendar
            startDate={aux.date.from}
            endDate={aux.date.to}
            monthsDisplayed={width > 660 ? 2 : 1 }
            afterChange={(dateFrom, dateTo) => { handleDates(dateFrom, dateTo)}}
          />
        </DeskSearchbarModal>

        {/* <DeskSearchbarModal
          flowBottom
          active={false}
          icon={<UserGroupIcon className='w-7 h-7 text-violet-700' />}
          text="Córdoba, Argentina"
          placeholder="Any guests - no pets"
        >
          <div className='h-full w-32'>
            <p className='absolute flex top-6 left-6
            origin-top-right -translate-x-full -rotate-90
            text-2xl text-violet-700 tracking-widest font-bold uppercase'>Guests</p>
          </div>
        </DeskSearchbarModal> */}
        <button 
          onClick={() => setFilters({...filters, date: aux.date, location: aux.location})}
          className="flex justify-center items-center
          border border-violet-700 w-full md:w-32 h-12 rounded-md ml-2"
          >
            <p className='mr-2 text-lg text-violet-700'>Search</p>
            <MagnifyingGlassIcon className="w-6 h-6 text-violet-700" />
        </button>
      </div>
    </div>
  )
}
