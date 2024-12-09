import React from 'react'

export default function BorderBox({ children }) {
 return (
  <div className='border rounded-xl p-3'>
   {children}
  </div>
 )
}
