import { MapIcon, StarIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'

export const PropertyCard = ({
    property
}) => {
  return (
    <Link 
    to={`/product/${property.id}`} 
    state={{product: property}}
    className='w-full max-w-xs rounded-xl
    flex flex-col bg-white shadow-sm p-2 group'>
        <picture className='w-full h-60 overflow-hidden rounded-lg'>
            <img 
            className='w-full h-full object-cover transition-all duration-300
            group-hover:scale-110' 
            src={property.images[0]?.url}
            alt={property.images[0]?.name}
            />
        </picture>
        <div className='p-1 flex flex-col items-start text-left'>
            <p className='font-medium text-lg text-gray-900 
            max-w-[25ch] overflow-ellipsis whitespace-nowrap overflow-hidden'>{property.title}</p>
            <div className='flex items-center text-violet-700'>
                <MapPinIcon className='w-6 h-6 mr-1'/>
                <p className=''>{`${property.city?.name}, ${property.city?.country.name}`}</p>
            </div>
        </div>
        <div className='w-full flex justify-between items-center p-1 mt-4'>
            <p className='text-2xl text-gray-900'>
                $ {property.dailyPrice}
                <span className=' font-light italic text-gray-700'>/night</span>
            </p>
            <div className='flex items-center text-violet-700'>
                <StarIcon className='w-8 h-8' />
                <p className='text-xl font-medium'>5.0</p>
            </div>
        </div>
    </Link>
  )
}
