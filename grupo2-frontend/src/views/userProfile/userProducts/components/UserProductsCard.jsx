import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../../../components/modal/Modal';
import { PropertyCard } from '../../../../components/propertyCard/PropertyCard';
import { useLoadingViewContext } from '../../../../context/LoadingViewContext';
import { FetchRoutes, PrivateRoutes } from '../../../../guard/Routes';


export const UserProductsCard = ({data, deleteProduct}) => {

    const {
        status,
        startLoading,
        loadDone
      } = useLoadingViewContext()

    const [modal, setModal] = useState(false);



  return (
    <>
    <div className='flex flex-col w-full'>
        <PropertyCard property={data} />
        <div className='w-full grid grid-cols-2 gap-4 my-4 max-w-xs'>
            <Link
            to={PrivateRoutes.PRODUCTEDITID(data.id)}
            className='bg-white border-2 border-violet-700 font-medium text-violet-700 py-3 rounded-lg text-center'>
                Edit
            </Link>
            <button 
            onClick={() => setModal(true)}
            className='bg-red-400 font-medium text-white py-3 rounded-lg text-center'>
                Delete
            </button>
        </div>

    </div>
    <Modal
    isOpen={modal}
    closeModal={() => { setModal(false)}}
    >
    <div className='w-screen max-w-[90vw] md:max-w-lg max-h-96 
    bg-white rounded-lg flex flex-col items-center p-4 shadow-xl'>
        <ExclamationCircleIcon className='w-20 h-20 mb-4 text-red-400' />

        <p className='text-xl md:text-2xl font-medium mb-2 text-gray-800'>Are you sure?</p>
        <p className='md:text-lg text-gray-600 mb-4'>You can't undo this action</p>
        <div className='flex items-center gap-4'>
            <button
            onClick={() => { setModal(false) }}
            className="py-3 w-32 text-violet-700 bg-white border-2 border-violet-700
            rounded-md text-lg font-medium">
            Go back
            </button>
            <button
            onClick={() => { deleteProduct(data.id); setModal(false); }}
            className="py-3 w-32 text-white bg-red-400
            rounded-md text-lg font-medium">
            Delete
            </button>
        </div>  
    </div>
    </Modal>
    </>
  )
}
