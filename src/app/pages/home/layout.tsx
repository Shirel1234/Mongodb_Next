import ButtonLink from '@/app/components/Button';
import React from 'react'

const routes = [
    { href: '/pages/home/books', text: 'Books' },
    { href: '/pages/home/cars', text: 'Cars' },
    { href: '/pages/home/movies', text: 'Movies' }
];

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div>
        <div className='text-black flex justify-between bg-blue-300'>
            <div className='flex items-center'>
            </div>
            <div className=''>
                {routes.map((route, index) => (
                    <ButtonLink key={index} href={route.href} text={route.text} />
                ))}
            </div>
        </div>
        {children}    
        </div>
        
    );
}

