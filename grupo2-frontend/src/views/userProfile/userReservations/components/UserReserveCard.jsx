import React from 'react'
import { FetchRoutes } from '../../../../guard/Routes';



export const UserReserveCard = ({data}) => {

    Date.prototype.formatMMDDYYYY = function(){
        return (this.getUTCMonth() + 1) + 
        "/" +  this.getUTCDate() +
        "/" +  this.getUTCFullYear();
    }

    const handleDateFormat = date => {
        const aux = new Date(date)
        return aux.formatMMDDYYYY()
    };

    const priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

  return (
    <div className='border border-gray-200 p-4 rounded-md w-full'>
        <p className=' text-gray-700 font-medium 
            overflow-ellipsis whitespace-nowrap overflow-hidden 
            max-w-[20ch] sm:max-w-[25ch]'>{data.product.title}
        </p>
        <div className='p-2 w-full'>
            <img
            src={data.product.images[0].url} 
            alt={data.product.images[0].name}
            className="w-full h-full max-h-40 object-cover rounded-lg overflow-hidden"
            />
        </div>

        <div className='flex justify-between w-full my-4'>
            <div className='flex flex-col items-center justify-center'>
                <p className=' text-gray-800 mb-2'>Checkin</p>
                <div className='p-3 rounded-xl bg-violet-700 flex flex-col w-32'>
                    <p className='text-white font-bold mx-auto'>
                        { handleDateFormat(data.checkInDate)}
                    </p>
                </div>
            </div>
            <img className='w-10 mt-8'
            src={`${FetchRoutes.BUCKET}/svg/right_thin_arrow.svg`}
            alt="right arrow"
            />
            <div className='flex flex-col items-center justify-center'>
                <p className=' text-gray-800 mb-2'>Checkout</p>
                <div className='p-3 rounded-xl bg-violet-700 flex flex-col w-32'>
                    <p className='text-white font-bold mx-auto'>
                        { handleDateFormat(data.checkOutDate)}
                    </p>
                </div>
            </div>
        </div>

        <p className='font-medium text-center mb-4'>
            Arrives at {data.checkInTime}
        </p>

        <div className='flex justify-between items-end w-full pt-2 border-t-2'>
            <p className='text-gray-400'>Total</p>
            <p className='font-medium text-gray-700'>{priceFormatter.format(data.finalPrice)}</p>
        </div>
    </div>
  )
}
