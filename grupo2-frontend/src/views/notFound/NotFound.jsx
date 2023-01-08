import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { HeaderNav } from '../../components/partials';
import { useLoadingViewContext } from '../../context/LoadingViewContext'


export const NotFound = () => {

  const navigate = useNavigate();

  const {
    loadDone,
  } = useLoadingViewContext()

  useEffect(() => {
    loadDone()
  }, [])
  
  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-pattern-repeat opacity-20" />

      <HeaderNav transparent />
      <BaseLayout
      padding="pt-0"
      className='min-h-screen flex flex-col items-center justify-center'
      > 
        <div className='w-screen max-w-[90vw] md:max-w-lg max-h-96 
       rounded-lg flex flex-col items-center p-4 text-center '>
        <QuestionMarkCircleIcon className='w-20 h-20 mb-4 text-violet-500' />

        <p className='text-xl md:text-2xl font-medium mb-2 text-gray-800'>Ops! Seems there's nothing here</p>
        <p className='md:text-lg text-gray-600 mb-4'>It looks like we moved from here. After all, we're true
          <span className="text-violet-500"> nomads!</span>
        </p>
        <button
        onClick={() => navigate('/')}
        className="py-3 w-32 text-violet-700 border-2 border-violet-700
        rounded-md text-lg font-medium">
          Back home
        </button>
      </div>
      </BaseLayout>
    </>

  )
}
