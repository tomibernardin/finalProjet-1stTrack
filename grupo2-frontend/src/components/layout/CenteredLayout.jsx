import React from 'react'

export const CenteredLayout = (props) => {
  return (
    <section className='w-screen flex items-center justify-center' >
        {props.children}
    </section>
  )
}
