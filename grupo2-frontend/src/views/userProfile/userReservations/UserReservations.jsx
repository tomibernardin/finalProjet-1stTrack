import { ArrowLeftIcon, FaceFrownIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BaseLayout } from '../../../components/layout/BaseLayout'
import { HeaderNav } from '../../../components/partials'
import { useLoadingViewContext } from '../../../context/LoadingViewContext'
import { useUserContext } from '../../../context/UserContext'
import { FetchRoutes, PrivateRoutes, PublicRoutes } from '../../../guard/Routes'
import { UserReserveCard } from './components/UserReserveCard'

export const UserReservations = () => {

    const {
        status,
        startLoading,
        loadDone
      } = useLoadingViewContext()

      const { user } = useUserContext();

      const [data, setData] = useState(null)

      const navigate = useNavigate();

      const fetchData = async () => {
        try {
          startLoading();
          const {data : reservations} = await axios.get(`${FetchRoutes.BASEURL}${PrivateRoutes.USERRESERVATIONSID(user.id)}`,
          { headers: { Authorization : user.authorization }})

          setData(reservations);
            
        } catch (error) {
          console.error(error.message);
          navigate('/bad-request')
        } finally{ loadDone() };
    }
    useEffect(() => {
        if(!data){fetchData()}

    }, [])
    
  return (
     <>
        <HeaderNav />
        <BaseLayout
          wrapperClassName="bg-logo-hero-search"
          padding='px-3 pt-20 lg:pt-24'
        >
            <div className='flex items-end justify-between w-full py-6'>
                <h1 className='text-2xl font-semibold text-white'>My reservations</h1>
                <ArrowLeftIcon
                onClick={() => navigate(-1)}
                className="text-white w-10 h-10" />
            </div>
        </BaseLayout>
        <BaseLayout
          padding='px-3 pt-4 md:pt-6'
          className=" mb-10"
        >
            <p className='text-end mb-4 md:mb-6 mr-2 text-gray-400 md:px-10'>{`Viewing results ${data ? data.length : 0} from ${data ? data.length : 0} `}</p>
            
            {data?.length > 0 &&
              <div className='w-full place-items-center grid md:px-2
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {data?.map((reserve, i) => (
                    <UserReserveCard data={reserve} key={i} />
                ))}
            </div>}
            {data?.length === 0 && 
            <div className='w-screen max-w-[90vw] md:max-w-lg max-h-96 
            flex flex-col items-center p-4 mx-auto'>
             <FaceFrownIcon className='w-20 h-20 mb-4 text-violet-700' />
     
             <p className='text-xl md:text-2xl font-medium mb-2 text-gray-800'>No reservations yet</p>
             <p className='md:text-lg text-gray-600 mb-4'>Search a place to start your journey</p>
             <Link
             to={PublicRoutes.HOME}
             className="py-3 w-32 text-white bg-violet-700
             rounded-md text-lg font-medium text-center">
               Let's go!
             </Link>
           </div>
            }
        </BaseLayout>
    </>
  )
}
