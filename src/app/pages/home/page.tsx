import ButtonLink from '@/app/components/Button';
import React from 'react'

const Page = () => {

  const routes = [
    { href: '/pages/books', text: 'Books' },
    { href: '/pages/cars', text: 'Cars' },
    { href: '/pages/movies', text: 'Movies' }
  ];

  return (
    <div className= 'text-black flex justify-between bg-blue-300'>
       <div className='flex items-center'>
        </div>
        <div className=''>
          {routes.map((route, index) => (
            <ButtonLink key={index} href={route.href} text={route.text} />
          ))}
        </div>
    </div>
  )
}

export default Page
