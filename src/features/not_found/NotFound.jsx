import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="text-red-500 w-full max-w-sm">
        <h6 className='text-5xl font-semibold text-center'>404 Not Found</h6>
        <NavLink
          to="/"
        >
          <button
            className='text-white py-2 w-full uppercase mt-4 font-medium bg-sky-500 rounded-lg'
          >

            go to home
          </button>
        </NavLink>
      </div>
    </div>
  )
}
