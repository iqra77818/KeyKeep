import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-700 flex justify-around items-center px-4 h-14 text-white' >
        <div className="logo font-bold">KeyKeep</div>
        <ul>
            <li>
             <a href='/'>Home</a>
            </li>
        </ul>
      
    </nav>
  )
}

export default Navbar
