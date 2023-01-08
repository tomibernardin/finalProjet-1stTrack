import React from 'react'

export const BaseLayout = ({
  wrapperClassName,
  className,
  padding = "pt-20 lg:pt-24",
  anchor,
  anchorPosition = '-150',
  ...props
}) => {
  return (
    <section className={`max-w-screen relative ${wrapperClassName}`} { ...props }>
      {anchor && 
        <a id={anchor} style={{
          // display : 'block',
          position: 'absolute',
          top : `${anchorPosition}px`,
          visibility : 'hidden'
        }} />}
      <div className={`${padding} px-3 max-w-[1500px] mx-auto ${className}`}>
        {props.children}
      </div>
    </section>
  )
}
