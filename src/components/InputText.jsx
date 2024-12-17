export default function InputText({ id, label, palceholder, hideLabel = true }) {
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
    className="border bg-transparent text-white border-custom_line_two rounded-md px-3 py-2 outline-none placeholder:capitalize placeholder:text-custom_line_one focus:border-custom_line_one"
   />
  </div>
 )
}
