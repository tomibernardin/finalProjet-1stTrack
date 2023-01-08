import React from 'react'
import { Datalist, DatalistItem } from '../../../datalist'
import { useSearchContext } from '../../../../context/SearchContext'
import { MapPinIcon } from '@heroicons/react/24/outline'

export const LocationDatalist = ({flowTop, origin, setOrigin}) => {

    const { cities } = useSearchContext();

  return (
    <Datalist
    flowTop={flowTop}
    data={cities}
    value={origin.location ? `${origin.location?.name},  ${origin.location?.country.name}` : null}
    id='locations_dsk_filter'
    // label='Company / Organization'
    placeholder='Search around the world'
    onChange={(e) => setOrigin({...origin, location: e})}
    resultRenderer={(city, i) => (
      <DatalistItem
        key={i}
        name={`${city.name}, ${city.country.name}`}
        id={city.id}
        value={city}
        icon={<MapPinIcon className='w-6 h-6 mr-2 text-violet-600' />}
      />)
    }
  />
  )
}
