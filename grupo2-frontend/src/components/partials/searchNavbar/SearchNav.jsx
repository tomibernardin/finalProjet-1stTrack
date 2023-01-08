import React from 'react'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { DesktopSearch } from './desktopNav/DesktopSearch'
import { MobileSearch } from './mobileNav'
import './searchNavbar.scss'

export const SearchNav = ({hide}) => {
  const {width, height} = useWindowDimensions()
  
  if (width < 1399) {return <MobileSearch hide={hide} />} else {return <DesktopSearch hide={hide} /> }
  
}
