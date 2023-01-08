import { Menu } from '@headlessui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const DropLink = ({
    className = "flex w-full items-center rounded-md px-2 py-2 text-sm",
    activeClassName,
    inactiveClassName,
    onClick,
    to,
    ...props
    }) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                to={to}
                onClick={onClick}
                className={`${ active ? activeClassName :  inactiveClassName } ${className}`}
                {...props}
                >
                    {props.children}
                </Link>
            )}
        </Menu.Item>
    )
}
