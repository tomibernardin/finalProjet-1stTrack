import React from 'react'
import { useSearchContext } from '../../../context/SearchContext'

export const HomeCategories = ({categories}) => {
    const {filters, setFilters, applyCategory } = useSearchContext();

    return (
        <section className='w-full flex flex-col' >
            <h2 className='text-2xl font-medium mb-6'>
                Search from one of our categories
            </h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {
                categories?.map((category, i) => { return(
                    <a 
                    href='#main-feed' 
                    key={i} 
                    className='rounded-xl shadow-md overflow-hidden h-32 md:h-40
                    flex items-center justify-center cursor-pointer'
                    onClick={() => { category.id  === filters.category ? applyCategory(null) : applyCategory(category.id)}}
                    >   
                        <img
                        className={`h-full w-full object-cover transition-all
                        ${filters?.category === category.id ? '' : 'grayscale'}`}
                        src={category.categoryImage.url} 
                        alt={category.categoryImage.description}
                        />
                        <p className='absolute text-3xl font-semibold drop-shadow-md text-white'>
                            {category.title}
                        </p>
                    </a>
                )})
            }
            </div>
            
        </section>
    )
}
