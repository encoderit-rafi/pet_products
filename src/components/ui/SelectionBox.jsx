import CloseIcon from "@/assets/icons/CloseIcon"
import React from 'react'

export default function SelectionBox({ data = [], onClickClose }) {
 return (
  <div className="flex items-center w-full gap-1 pb-1 !mt-1 overflow-x-auto">
   {data?.map((item) => (
    <div
     key={item.id}
     className="flex items-center gap-5 px-4 py-2 text-sm font-light rounded-xl text-custom_text_two bg-custom_bg_eleven whitespace-nowrap"
    >
     <span>{item.name}</span>
     <div
      className="cursor-pointer size-3 text-custom_text_two"
      onClick={() =>
       // setSelectedOptions((prev) =>
       //   prev.filter((item) => item.id != option.id)
       // )
       onClickClose(item)
      }
     >
      <CloseIcon />
     </div>
    </div>
   ))}
  </div>
 )
}
