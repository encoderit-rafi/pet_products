import React from 'react'

export default function Label({ id, label, palceholder }) {
 return (
  <label
   htmlFor={id}
   className="text-sm font-medium text-white"
   aria-label={palceholder}
  >
   {label}
  </label>

 )
}
