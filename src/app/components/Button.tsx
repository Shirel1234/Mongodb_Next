import Link from 'next/link'
import React from 'react'

interface ButtonLinkProps {
  href: string;
  text: string;

}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, text }) => {
  return (

    <Link href={href}>
      <button className='m-3 text-white hover:bg-blue-300'>
        {text}
      </button>
    </Link>
  )

}



export default ButtonLink
