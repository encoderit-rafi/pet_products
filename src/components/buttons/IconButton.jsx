import cn from '@/lib/utils/cn'
import React from 'react'

export default function IconButton({ children,className, ...props }) {
 return (
  <button className={cn("flex items-center justify-center border size-12 bg-custom_bg_two rounded-xl border-custom_line_three text-custom_text_two",className)} {...props}>
   {children}
  </button>
 )
}
