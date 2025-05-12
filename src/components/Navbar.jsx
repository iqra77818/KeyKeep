import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-violet-950 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-white'> &lt;</span>
          <span>KeyKeep</span><span className='text-white'>&gt;</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

