import cn from '@/lib/utils/cn'
import React from 'react'

export default function ImagePreview({ src, onClickClose, className }) {
 return (
  <div className={cn("relative group shrink-0 mx-auto", className)}>
   {/* {src} */}
   <img
    src={src}
    alt="preview"
    className="object-cover rounded-lg size-40"
   />
   <button
    type='button'
    onClick={onClickClose}
    className="absolute text-white bg-red-500 rounded-full opacity-75 top-2 right-2 size-6 hover:opacity-100"
   >
    &times;
   </button>
  </div>
 )
}
