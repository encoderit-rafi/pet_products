import cn from '@/lib/utils/cn'
import React from 'react'

export default function BaseButton({ children, className, varient = "base", ...props }) {
 return (
  <button
   className={cn(
    "w-full  py-3 font-medium rounded-xl whitespace-nowrap  text-lg capitalize",
    {
     "bg-custom_bg_one text-custom_text_two": varient == "base",
     "bg-gradient-to-r from-[#00B451]  to-[#74B222] text-white": varient == "gradient",

    },
    className
   )}
   {...props}
  >
   {children}
  </button>
 )
}
