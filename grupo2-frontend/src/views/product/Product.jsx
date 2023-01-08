import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BaseLayout } from '../../components/layout/BaseLayout'
import { Footer, HeaderNav, SearchNav } from '../../components/partials'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon, MapPinIcon, PhotoIcon, StarIcon } from '@heroicons/react/24/outline'
import { FeatureItem } from '../../components/featureItem/FeatureItem'
import { ImageSlider } from '../../components/imageSlider/ImageSlider'
import { ImageGallery } from '../../components/imageGallery/ImageGallery'
import {Modal} from '../../components/modal/Modal'
import { Calendar } from '../../components/Calendar/Calendar'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { PolicyList } from './components/PolicyList'
import { useLoadingViewContext } from '../../context/LoadingViewContext'
import { FetchRoutes, PrivateRoutes } from '../../guard/Routes'
import { useSearchContext } from '../../context/SearchContext'
import { filterProps } from 'framer-motion'

export const Product = () => {
    const navigate = useNavigate();

    const { filters } = useSearchContext()

    const {
        startLoading,
        loadDone,
        triggerError,
      } = useLoadingViewContext();

      const [date, setDate] = useState({
        from: filters.date?.from,
        to: filters.date?.to,
      })

      const handleDates = ( dateFrom, dateTo )=> {
        setDate({ from:dateFrom, to:dateTo})
      }

    // const {filters, handleDates} = useSearchContext()
    const {state} = useLocation()

    const [ data, setData ] = useState(state?.product)
    const [avoidDates, setAvoidDates ] = useState()
    
    var now = new Date();
    
    const excludeDatesHandler = excArr => excArr.map(range => ({ start: range.checkInDate  + now.getTimezoneOffset() * 60000, end :  range.checkOutDate + now.getTimezoneOffset() * 60000}))    
    const {id} = useParams();

    const fetchData = async () =>{
        startLoading();
        try {
        const { data } = await axios.get(`${FetchRoutes.BASEURL}/product/${id}`);
        setData(data);
        const { data :  dates} = await axios.get(`${FetchRoutes.BASEURL}/reservation/product/${id}`);
        setAvoidDates(excludeDatesHandler(dates));
        } catch (error) {
        console.error(error.message);
        triggerError()
        }
        loadDone();
    }

    useEffect(() => {
          if ( !data || !avoidDates ) { fetchData() };
          if ( data && avoidDates ) { loadDone() };
    }, [])


    const [modal, setModal ] = useState(false);

    const { width } = useWindowDimensions();

    const [error, setError] = useState(false);
    
    const validateDates = () => date?.to && date?.from

    const handleReserve = () => validateDates() ? navigate(
        PrivateRoutes.RESERVEID(data.id), 
        {state: {product: data, dates: date, avoidDates: avoidDates}}) : setError(true)
    
    
  if (data) {return (
    <>
    <HeaderNav />
    <BaseLayout
        padding='mt-16 lg:mt-24 md:px-6 lg:px-8'
        wrapperClassName="bg-violet-800 sticky top-16 lg:top-24 z-20"
        className="flex items-center justify-between"
    >
        <div className='flex flex-col items-start justify-center py-4'>
            <p className='uppercase text-gray-200 font-thin text-lg'>{data.category.title}</p>
            <p className='text-xl text-white font-medium overflow-ellipsis whitespace-nowrap overflow-hidden 
            max-w-[20ch] sm:max-w-[25ch] md:max-w-none'>{data.title}</p>
        </div>
        <button onClick={() => navigate(-1)}>
            <ChevronLeftIcon className='w-10 h-10 text-white' />
        </button>
    </BaseLayout>
    <BaseLayout
        wrapperClassName="bg-violet-100"
        className=" flex items-center justify-between"
        padding='pt-4 pb-4 md:px-6 lg:px-8'
    >
        <div className='flex items-center text-gray-700 max-w-[100vw]'>
            <MapPinIcon className='w-6 h-6' />
            <div className='ml-2 flex items-center text-sm md:text-base'>
                <p className='overflow-ellipsis whitespace-nowrap overflow-hidden 
                max-w-[25ch] sm:max-w-none'>{data.city.name},
                <span className='ml-1 font-medium text-gray-900'>{data.city.country.name}</span>
                </p>
            </div>
        </div>
        <div className='flex items-center'>
            <StarIcon className='w-6 h-6 text-violet-700' />
            <StarIcon className='w-6 h-6 text-violet-700' />
            <StarIcon className='w-6 h-6 text-violet-700' />
            <StarIcon className='w-6 h-6 text-violet-700' />
            <StarIcon className='w-6 h-6 text-gray-500' />
        </div>
    </BaseLayout>
    <BaseLayout
        padding='p-2 px-2'
        wrapperClassName="xl:hidden"
    >
        <ImageSlider images={data.images} />
    </BaseLayout>
    <BaseLayout
        padding='p-4 px-4 md:px-6 lg:px-8'
        wrapperClassName="hidden xl:block"
    >
        <div className='flex items-center justify-center w-full gap-4'>
            <div className='h-full max-h-[550px] w-[70%] rounded-lg overflow-hidden'>
                <img
                className='w-full h-full object-cover'
                src={data.images[0].url} 
                alt={data.images[0].naFme}
                />
            </div>
            <div className='h-full max-h-[550px] w-[30%] overflow-hidden
            grid grid-cols-2 grid-rows-4 gap-4'>
                {
                    data.images.map((image, i) => { 
                        if (i > 0 && i <= 7){ return(
                            <img
                            className='w-full h-full object-cover rounded-lg'
                            src={image.url} 
                            alt={image.name}
                            key={i}
                            />
                        )}
                    })
                }
            
                <div 
                    onClick={() => setModal(true)}
                    className='flex flex-col items-center gap-4 justify-center
                    border-2 border-gray-200 rounded-lg cursor-pointer'
                >
                    <PhotoIcon className='w-10 h-10 text-gray-400' />
                    <p className='text-gray-500'>{`View more (${data.images.length})`}</p>
                </div>
            </div>
        </div>
        <Modal isOpen={modal} closeModal={() => setModal(false)} >
            <ImageGallery images={data.images} />
        </Modal>
    </BaseLayout>
    <BaseLayout
        padding='px-4 md:px-6 lg:px-8 p-2 pb-4 pt-6'
    >
        <h3 className='text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 mb-3'>{data.title}</h3>
        <p className='text-gray-700 md:text-lg max-w-4xl'>{data.description}</p>
    </BaseLayout>
    <BaseLayout
        wrapperClassName='my-4'
        padding=' py-0  p-2 md:px-6 lg:px-8'
    >
        <div className='rounded-md border-2 border-violet-500 overflow-hidden'>
            <h5 className='text-lg md:text-xl px-4 py-4
            text-gray-700 border-b-2 border-violet-500'>
                What this place offers
            </h5>
            <ul className='bg-gradient-to-tr from-gray-100 to-violet-50  px-4 py-4 
            grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 gap-x-4'>
                {data.features?.map((feature, i) => (
                    <FeatureItem
                    key={i}
                    icon={feature.featureImage.url}
                    text={feature.name}
                    />
                ))}
            </ul>
        </div>
    </BaseLayout>
    <BaseLayout
        wrapperClassName="bg-gradient-to-tr from-violet-200 to-violet-50"
        className='flex flex-col items-center justify-center lg:items-start'
        padding='px-2 md:px-6 lg:px-8 py-10'
    >
        <h5 className='text-2xl md:text-3xl lg:text-4xl mb-4
        text-gray-700 font-medium'>Reserve</h5>

        <div className='flex flex-col w-full items-center justify-center gap-4
        md:gap-6 lg:flex-row lg:justify-start'>
            <Calendar
            startDate={date.from}
            endDate={date.to}
            afterChange={(dateFrom, dateTo) => {
                const dateFromMl = dateFrom?.getTime();
                const dateToMl = dateTo?.getTime();

                if (!dateToMl) {handleDates(dateFrom, dateTo)}

                if (!avoidDates?.some(elm => {
                    return(dateFrom  < elm.start ) && (dateTo > elm.end )
                })) {
                    handleDates(dateFrom, dateTo)
                
            }}}
            monthsDisplayed={width > 660 ? 2 : 1 }
            excludeDateIntervals={avoidDates}
            />
            <div className='gap-2 flex flex-col items-center md:flex-row 
            lg:px-4 lg:py-10 lg:border-2 lg:border-violet-700 lg:rounded-lg
            lg:bg-white lg:mx-auto' >
                <p className={`${error ? 'text-red-400' : 'text-gray-600'} transition-colors md:mr-2`}>
                    Select the date to start your reservation</p>
                <button
                onClick={handleReserve}
                className={`${error ? 'border-red-400 border-2' : ''}
                flex items-center px-4 py-3 bg-violet-700 rounded-lg`}
                >
                    <p className='mr-2 text-white font-medium'>Continue</p>
                    <ArrowRightIcon className='w-6 h-6 text-white' />
                </button>
            </div>
        </div>
    </BaseLayout>
    <BaseLayout
        padding='px-4 md:px-6 lg:px-8 p-2'
        className='py-10 flex flex-col '
    >
        <h5 className='text-2xl md:text-3xl lg:text-4xl mb-4
        text-gray-700 font-medium'>Rent policies</h5>

        <div className='grid grid-cols-1 md:gird-cols-2 lg:grid-cols-3 gap-8 mt-4'>
        { data.policies?.map((item, i) => (
            <PolicyList key={i} title={item.name} list={item.policyItems} />
        ))} 
        </div>
    </BaseLayout>
    <Footer />
</>
  )}

  else {
    return(<p>err</p>)
  }
}
