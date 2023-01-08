import React from 'react'
import { MobileNavModal } from './MobileNavModal'
import { useSearchContext } from '../../../../context/SearchContext'
import { PropertyTypeSelect } from '../components/PropertyTypeSelect'
import { CountSelect } from '../components/CountSelect'
import { CollapsableMenu } from '../../../collapsableMenu/CollapsableMenu'
export const MobileNavFilters = ({open, setOpen}) => {

    const {filters, categories, setFilters, applyCategory} = useSearchContext()

  return (
    <MobileNavModal setOpen={setOpen} open={open}>
        <CollapsableMenu
                question='Price range'
            >
                <div className='flex items-center space-x-2 py-4 ml-0.5'>
                    <input 
                        type='number'
                        onChange={(e) => setFilters({...filters, price: {...filters.price, min: e.target.value}})}
                        value={filters.price.min}
                        className=' max-w-[130px] py-2 px-3
                        rounded-lg ring-1 ring-gray-400 
                        focus:ring-violet-700 active:ring-violet-700 asd
                        placeholder:text-gray-600 focus:outline-none'
                        placeholder='$ min. price'
                    />
                    <span className='text-gray-800'>to</span>
                    <input 
                        type='number' 
                        onChange={(e) => setFilters({...filters, price: {...filters.price, max: e.target.value}})}
                        value={filters.price.max}
                        className=' max-w-[130px] py-2 px-3
                        rounded-lg ring-1 ring-gray-400 
                        focus:ring-violet-700 active:ring-violet-700 
                        placeholder:text-gray-600 focus:outline-none'
                        placeholder='$ max. price'
                    />
                </div>
        </CollapsableMenu>

        <CollapsableMenu
            question='Property type'
        >
            <div className='flex items-center justify-start
            pt-4 overflow-auto  snap-x snap-mandatory  scrollbar-none'>
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
        </CollapsableMenu>
        <CollapsableMenu
            question='Rooms and beds'
        >
            <h5 className='text-lg font-semibold text-gray-600 mt-5 px-2'>Rooms</h5>
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
        </CollapsableMenu>            

    </MobileNavModal>
  )
}
