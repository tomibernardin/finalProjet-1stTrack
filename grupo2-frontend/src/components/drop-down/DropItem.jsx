import { Menu } from '@headlessui/react'
import React from 'react'

export const DropItem = ({
    className = "flex w-full items-center rounded-md px-2 py-2 text-sm",
    activeClassName,
    inactiveClassName,
    onClick,
    ...props
    }) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                onClick={onClick}
                className={`${ active ? activeClassName :  inactiveClassName } ${className}`}
                >
                    {props.children}
                </button>
            )}
        </Menu.Item>
    )
}
