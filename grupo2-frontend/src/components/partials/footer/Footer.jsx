import React from 'react'
import { FetchRoutes } from '../../../guard/Routes';
import { BaseLayout } from '../../layout/BaseLayout'

export const Footer = () => {
  const year = new Date();
  const socialMedia = [
    {
      url: `${FetchRoutes.BUCKET}/icons/facebook-app-logo-svgrepo-com.svg`,
      name: 'Facebook icon',
    },
    {
      url: `${FetchRoutes.BUCKET}/icons/instagram-svgrepo-com.svg`,
      name: 'Instagram icon',
    },
    {
      url: `${FetchRoutes.BUCKET}/icons/linkedin-svgrepo-com.svg`,
      name: 'Linkedin icon',
    }
  ]
  return (
    <BaseLayout
    wrapperClassName="bg-violet-900"
    className='pt-10'
    >
    <div className='w-full overflow-hidden p-4'>
    <div className='flex justify-between items-end'>
      <p className='text-white ml-[5%] md:text-lg font-thin'>
        {`${year.getFullYear()} © - Grupo 2.`}
      </p>
      <li className='flex items-center gap-2 md:gap-4 mr-[5%]'>
        {socialMedia.map((icon, i) => (
          <img src={icon.url} key={i} alt={icon.name} className="h-6 w-6 md:w-8 md:h-8" />
          ))}
      </li>
    </div>
      <img src={`${FetchRoutes.BUCKET}/logo/logo_md_variant_outline.svg` }
      alt='logo_outline nomad'
      className='w-full -mb-[10%] pb-16 md:pb-0'
      />
    
    </div>
    </BaseLayout>
  )
}
