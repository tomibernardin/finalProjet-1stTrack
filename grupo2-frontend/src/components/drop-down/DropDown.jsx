import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export const DropDown = (props) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div className='flex items-center'>
          <Menu.Button className="inline-flex w-full justify-center 
          rounded-md px-4 text-lg xl:text-xl font-medium  items-center
          text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75">
            {props.button}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-gray-600 hover:text-gray-800"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-3 w-48 origin-top-right divide-y divide-gray-300 rounded-md 
          bg-white shadow-lg ring-2 ring-gray-700 ring-opacity-5 focus:outline-none">
            {props.children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}