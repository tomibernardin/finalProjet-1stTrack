import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { CheckBadgeIcon, CheckIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBarModal.scss'

export default function DeskNavBarModal({placeholder, route, alt}) {
  return (
    <div className="relative">
      <NavLink to={route}
        className={({isActive})=>`
          group inline-flex items-center rounded-md  text-base
            hover:text-opacity-100 focus:outline-none focus-visible:ring-2 
            focus-visible:ring-white focus-visible:ring-opacity-75
            ${isActive ? 'hidden' : 'block'}`}
      >   
          <div className={`font-semibold
          ${alt ? 'border-2 border-violet-700 text-violet-700' : 'bg-violet-700 text-white'} w-32 h-12
          flex items-center justify-center rounded-lg
          transition ease-in-out
          hover:-translate-y-0.5 hover:scale-105 duration-200`}
          >
            {placeholder}
          </div>
      </NavLink>
    </div>
  )
}
