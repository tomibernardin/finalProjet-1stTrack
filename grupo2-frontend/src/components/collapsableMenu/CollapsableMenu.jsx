import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

export const CollapsableMenu = ({question, className, initial = false, questionClassName, wrapperClassName, ...props}) => {

    const [isOpen, setIsOpen] = useState(initial)
  return (
    <article
      className="flex flex-col text-left w-full rounded-lg h-auto cursor-pointer"
    >
      <div 
        className={`flex justify-between items-center w-full mb-4 ${className}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={`text-xl font-semibold ${questionClassName}`}>{question}</div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            initial={{
              rotate: !isOpen ? 0 : 180,
            }}
            animate={{
              zIndex: 1,
              rotate: !isOpen ? 0 : 180,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circOut",
              },
            }}
            exit={{
              zIndex: 0,
              rotate: !isOpen ? 0 : 180,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circIn",
              },
            }}
          >
            <ChevronDownIcon className="w-6 h-6" />
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            key={props.answer}
            className={`w-full ${wrapperClassName}`}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
