import { CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { HeaderNav } from '../../components/partials';
import { useLoadingViewContext } from '../../context/LoadingViewContext'
import { FetchRoutes, PublicRoutes } from '../../guard/Routes';

export const VerifyConfirmation = () => {


  const navigate = useNavigate();

  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');

  const {
    startLoading,
    loadDone,
    triggerError,
  } = useLoadingViewContext()

  useEffect(() => {
    const postRequest = async () =>{
      startLoading();
        try {
          await axios.post(`${FetchRoutes.BASEURL}/user/verify`,
          { code: code});
        } catch (error) {
          console.error(error.message);
          navigate('/bad-request')
        } finally { loadDone() }
        
      }
      
      postRequest();
}, [])

  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <video 
        src={`${FetchRoutes.BUCKET}/media/nomad_login_bg_720.mp4`}
        className="object-cover w-full h-full"
        autoPlay muted loop
        />
      </div>

      <HeaderNav transparent />
      <BaseLayout
      padding="pt-0"
      className='min-h-screen flex flex-col items-center justify-center'
      > 
        <div className='w-screen max-w-[90vw] md:max-w-lg max-h-96 text-center
      bg-white rounded-lg flex flex-col items-center p-4 shadow-xl'>
            <CheckCircleIcon className='w-20 h-20 mb-4 text-violet-700' />

        <p className='text-xl md:text-2xl font-medium mb-2 text-gray-800'>Account verified</p>
        <p className='md:text-lg text-gray-600 mb-4'>Thanks for joining Nomad. Start your journey.</p>
        <button
        onClick={() => navigate(PublicRoutes.LOGIN)}
        className="py-3 w-32 text-white bg-violet-700
        rounded-md text-lg font-medium">
          Login
        </button>
      </div>
      </BaseLayout>
    </>

  )
}
