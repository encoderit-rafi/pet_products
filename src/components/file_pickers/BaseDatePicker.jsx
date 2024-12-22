import DownIcon from '@/assets/icons/DownIcon';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';

export default function BaseDatePicker() {
 const [startDate, setStartDate] = useState(new Date());
 return (
  <div className="relative w-28">

   <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="MMM, yyyy" className=" w-full inline-flex text-[11px] text-custom_text_two font-extralight capitalize items-center gap-2 bg-custom_bg_two border rounded-full py-1.5 px-3 shadow-inner focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white" />
   <DownIcon className="absolute top-1/2 -translate-y-1/2 right-4 w-2 text-custom_text_one" />

  </div>
 );
}
