import cn from "@/lib/utils/cn";

export default function InputText({ id, label, palceholder, hideLabel = true, className }) {
 return (
  <div className="flex flex-col space-y-2 w-full">
   {hideLabel && <label
    htmlFor={id}
    className="text-sm font-medium text-white"
    aria-label={palceholder}
   >
    {label}
   </label>}
   <input
    id={id}
    type="text"
    placeholder={palceholder}
    aria-required="true"
    className={cn("border bg-white/5 text-white border-custom_line_one rounded-md px-3 py-2 outline-none placeholder:capitalize placeholder:text-custom_line_one focus:border-custom_line_one", className)}
   />
  </div>
 )
}
