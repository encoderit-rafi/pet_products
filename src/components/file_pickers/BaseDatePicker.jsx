import DownIcon from "@/assets/icons/DownIcon";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function BaseDatePicker({
  date,
  setDate,
  format = "MMM, yyyy",
}) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="relative ">
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="MMM, yyyy"
        maxDate={new Date()}
        // className=" w-full inline-flex text-xs text-custom_text_two font-light capitalize items-center gap-2 bg-custom_bg_two cursor-pointer border border-custom_line_two rounded-full py-1.5 px-3  focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white"
        className="base-input"
      />
      <DownIcon className="absolute w-3 -translate-y-1/2 top-1/2 right-4 text-custom_line_two" />
    </div>
  );
}
