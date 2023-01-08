import { InformationCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { BaseLayout } from '../../components/layout/BaseLayout'
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner'
import { HeaderNav } from '../../components/partials'
import { FetchRoutes, PublicRoutes } from '../../guard/Routes'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import './auth.scss'
import { useUserContext } from '../../context/UserContext'

export const Auth = () => {

  const { user } = useUserContext()
  const navigate = useNavigate()

  const {state} = useLocation()
  const [message, setMessage] = useState(state)

  const [status, setStatus] = useState('IDLE');

  useEffect(() => {
    if (user){
      navigate('/')
      return
    }
    if (message === null) { setMessage(state) }
  }, [state])
    
  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <img 
        src={`${FetchRoutes.BUCKET}/media/nomad-login-bg-720-12FPS.gif`}
        className="object-cover w-full h-full "
        autoPlay muted loop
        />
      </div>
      <HeaderNav transparent />
      <BaseLayout
      padding="pt-0"
      className='min-h-screen flex flex-col items-center justify-center'
      >

        <div className="w-full max-w-sm relative
        overflow-hidden bg-white rounded-lg shadow-md ">
            <div className="px-6 py-4">
              <h2 className="text-3xl font-bold text-center text-violet-700">Hi nomad :)</h2>
              
              {message?.error &&
              <div className='py-2 px-4 bg-red-400 rounded-lg text-center
              flex flex-col items-center justify-between text-white my-4'>
                <ShieldExclamationIcon className='w-10 h-10 mb-2' />
                  <p className='text-lg font-medium'>{message?.error.title}</p>
                  <p className=''>{message?.error.description}</p>
              </div>}

              {message?.notification &&
              <div className='py-2 px-4 bg-violet-400 rounded-lg text-center
              flex flex-col items-center justify-between text-white my-4'>
                <InformationCircleIcon className='w-10 h-10 mb-2' />
                  <p className='text-lg font-medium'>{message?.notification.title}</p>
                  <p className=''>{message?.notification.description}</p>
              </div>}

              <Routes>
                <Route path={'/signin'} element={<SignIn setStatus={setStatus} heading={ message === null } />}  />
                <Route path={'/signup'} element={<SignUp setStatus={setStatus} heading={ message === null } />}  />
              </Routes>
            </div>

            <Routes>
              <Route path={'/signin'} element={
                <div className="flex items-center justify-center py-4 text-center bg-gray-100">
                  <span className="text-sm text-gray-600">Don't an account? </span>
                  <Link to={PublicRoutes.REGISTER} className="mx-2 text-sm font-bold text-violet-700 hover:underline">Register</Link>
                </div>
              } />
              <Route path={'/signup'} element={
                <div className="flex items-center justify-center py-4 text-center bg-gray-100">
                  <span className="text-sm text-gray-600">Already an account? </span>
                  <Link to={PublicRoutes.LOGIN} className="mx-2 text-sm font-bold text-violet-700 hover:underline">Login</Link>
                </div>
              } />
            </Routes>
            <AnimatePresence>
            {status === 'LOADING' &&
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 auth-bg-loading-logo backdrop-blur-[20px] flex items-center justify-center '>
                <LoadingSpinner />
            </motion.div>}
            </AnimatePresence>
        </div>
      </BaseLayout>
    </>
  )
}
