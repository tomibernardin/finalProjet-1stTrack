import React, { useState } from 'react'
import DeskNavBarModal from './components/DeskNavBarModal'
import { FetchRoutes, PublicRoutes, PrivateRoutes } from '../../../guard/Routes'
import { useUserContext } from '../../../context/UserContext'
import { Link } from 'react-router-dom'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { AnimatePresence } from 'framer-motion'
import { MobileOpen } from './components/MobileOpen'
import { DropDown } from '../../drop-down'
import {
  ArrowRightOnRectangleIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  HomeModernIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { DropLink } from '../../drop-down/DropLink'

export const HeaderNav = ({transparent}) => {
  const { user, logout } = useUserContext();

  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); setOpen(false); }

  return (
    <section 
    className='top-0 fixed z-50
    w-screen flex items-center justify-between' >
        <div className={`w-full cursor-pointer min-h-[70px] lg:min-h-[96px] relative
        flex justify-end items-end p-4 lg:p-6 transition-all
        ring-1 ring-violet-700 ring-opacity-5 
        ${transparent && !open ? '' : 'bg-white  shadow-md'}`} >
          <div className='flex flex-col items-center lg:hidden h-auto w-full'>
            <div className='flex items-center justify-between w-full'>
              <Link to={PublicRoutes.HOME} >
                <img src={`${FetchRoutes.BUCKET}/logo/logo_demo.svg`} className='h-10' />
              </Link>
              <div className='p-2 w-10 h-10 flex items-center justify-center'
                onClick={() => setOpen(!open)}
              >
                {!open &&
                  <Bars2Icon className='w-6 h-6 text-violet-700' />}
                {open &&
                  <XMarkIcon className='w-6 h-6 text-red-400' />}
              </div>
            </div>
            <AnimatePresence initial={false} mode="wait" >
              {open &&  
                  <MobileOpen user={user} handleLogout={handleLogout} />
              }
            </AnimatePresence>
          </div>
          <nav className='hidden lg:flex items-center justify-between w-full max-w-[1500px] mx-auto'>
            <Link to={PublicRoutes.HOME} >
              <img src='/logo/logo_demo.svg' className='h-10' />
            </Link>
            <div className='flex items-center'>
            <Link 
            className='text-lg text-violet-700 mr-10'
            to={PrivateRoutes.PRODUCTCREATE} >Be a host</Link>
            {
              user ?
              <>
                <DropDown
                button={
                  <h2 className='text-xl font-thin'>Hello <span className='font-bold'>{user.firstName}</span></h2>
                }
                >
                  <div className='px-1 py-1 '>
                    <DropLink
                      activeClassName='bg-violet-500 text-white'
                      inactiveClassName='text-gray-600'
                    >
                      <UserIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                      Profile
                    </DropLink>
                    <DropLink
                    to={ PrivateRoutes.USERRESERVATIONSID(user.id) }
                      activeClassName='bg-violet-500 text-white'
                      inactiveClassName='text-gray-600'
                    >
                      <CalendarDaysIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                      My reservations
                    </DropLink>
                    <DropLink
                      to={ PrivateRoutes.USERPRODUCTSID(user.id) }
                      activeClassName='bg-violet-500 text-white'
                      inactiveClassName='text-gray-600'
                    >
                      <HomeModernIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                      My places (host)
                    </DropLink>
                  </div>

                  <div className='px-1 py-1'>
                    <DropLink
                    onClick={()=>{logout()}}
                      to={PublicRoutes.HOME}
                      activeClassName='bg-red-500 text-white'
                      inactiveClassName='text-red-400'
                    >
                      <ArrowRightOnRectangleIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                      Log out
                    </DropLink>
                  </div>
                </DropDown>
              </>
              :
              <div className='flex items-center gap-4'>
                <DeskNavBarModal
                alt
                route={PublicRoutes.REGISTER}
                placeholder="Sign Up">
                </DeskNavBarModal>
                <DeskNavBarModal
                route={PublicRoutes.LOGIN}
                placeholder="Sign In">
                </DeskNavBarModal>
              </div> 
            }
            </div>
          </nav>
        </div>
    </section>
  )
}
