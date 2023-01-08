import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '../views/notFound/NotFound'

export const RouteNotFound = (props) => {
  return (
    <Routes>
        {props.children}
        <Route path='*' element={<NotFound />}></Route>
    </Routes>
  )
}
