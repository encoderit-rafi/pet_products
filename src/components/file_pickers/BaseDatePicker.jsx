import DownIcon from "@/assets/icons/DownIcon";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function BaseDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="relative w-28">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MMM, yyyy"
        className=" w-full inline-flex text-xs text-custom_text_two font-light capitalize items-center gap-2 bg-custom_bg_two cursor-pointer border border-custom_line_two rounded-full py-1.5 px-3  focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white"
      />
      <DownIcon className="absolute w-3 -translate-y-1/2 top-1/2 right-4 text-custom_line_two" />
    </div>
  );
}
