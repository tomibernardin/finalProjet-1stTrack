import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

export const Modal = ({
    isOpen, closeModal
    ,...props
}) => {

  return (

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col gap-4 min-h-full items-center justify-center p-4 text-center relative">
                        {props.children}
                        <XMarkIcon 
                        onClick={closeModal}
                        className='absolute right-6 top-6 w-10 h-10 
                        text-white z-10 cursor-pointer' />
                    </div>
                </div>
              </Transition.Child>
            
        </Dialog>
      </Transition>
  )
}

