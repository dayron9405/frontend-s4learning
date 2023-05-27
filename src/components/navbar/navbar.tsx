import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='bg-sky-900 text-white p-2'>
      <nav className='flex justify-center items-center no-underline'>
        <Link className='m-2' href={'users'}>Usuarios</Link>
        <Link className='m-2' href={'contact'}>Contacts</Link>
      </nav>
    </div>
  )
}

export default Navbar