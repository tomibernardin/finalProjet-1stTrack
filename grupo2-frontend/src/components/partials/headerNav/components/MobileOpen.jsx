import React from 'react'
import {motion} from 'framer-motion';
import DeskNavBarModal from './DeskNavBarModal';
import { PrivateRoutes, PublicRoutes } from '../../../../guard/Routes';
import { Link } from 'react-router-dom';
import {
  ArrowRightOnRectangleIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  HomeModernIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useUserContext } from '../../../../context/UserContext';
import { CollapsableMenu } from '../../../collapsableMenu/CollapsableMenu';

export const MobileOpen = ({user, handleLogout}) => {

  return (
    <motion.nav className='flex flex-col w-full'
        initial={{
        height: 0,
        opacity: 0,
        }}
        animate={{
            height: "auto",
            opacity: 1,
            transition: {
            height: {
                    duration: 0.3,
            },
                opacity: {
                    duration: 0.25,
                    delay: 0.15,
            },
            },
        }}
        exit={{
            height: 0,
            opacity: 0,
            transition: {
            height: {
                duration: 0.3,
            },
            opacity: {
                duration: 0.25,
            },
        },
        }}
        >
            <div className=' py-10 w-full flex flex-col items-end gap-4 px-4'>
            {
                user ?
                <>
                    <h2 className='text-xl'>Hi <span className='font-bold'>{user.firstName}</span></h2>

                    <CollapsableMenu
                    question="My account"
                    questionClassName="ml-auto mr-4"
                    wrapperClassName="flex flex-col items-end gap-4 pr-4 border-r-4 border-gray-200"
                    >
                        <Link className='flex items-center gap-2 '>
                            <p className='md:text-lg'>Profile</p>
                            <UserIcon className='w-4 h-4 md:w-6 md:h-6' />
                        </Link>
                        <Link 
                        to={PrivateRoutes.USERRESERVATIONSID(user.id)}
                        className='flex items-center gap-2'>
                            <p className='md:text-lg'>My reserves</p>
                            <CalendarDaysIcon className='w-4 h-4 md:w-6 md:h-6' />
                        </Link>
                        <Link
                        to={PrivateRoutes.USERPRODUCTSID(user.id)}
                        className='flex items-center gap-2'
                        >
                            <p className='md:text-lg'>My places (host)</p>
                            <HomeModernIcon className='w-4 h-4 md:w-6 md:h-6' />
                        </Link>

                        <Link 
                        to={PublicRoutes.HOME}
                        onClick={ handleLogout }
                        className="flex items-center"
                        >
                        <p className='text-red-400 mr-2'>Logout</p>
                        <ArrowRightOnRectangleIcon
                        className='w-6 h-6 text-red-400'
                        />
                        </Link>

                    </CollapsableMenu>
                </>
                :
                <div className='flex w-full items-center justify-center gap-4'>
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
            <Link 
            className='text-xl text-violet-700'
            to={PrivateRoutes.PRODUCTCREATE} >Be a host</Link>
        </div>
    </motion.nav>
  )
}
