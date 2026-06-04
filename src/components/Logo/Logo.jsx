import React from 'react'

function Logo({width = "100px"}) {
  return (
    <div 
    style={{width}}
    className='text-2xl font-extrabold tracking-tight'
    >
      <span className='text-blue-600'>Blog</span>
      <span className='text-slate-800'>Vrese</span>
    </div>
  )
}

export default Logo
