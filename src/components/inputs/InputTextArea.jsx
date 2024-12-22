export default function InputTextArea({
 id,
 label,
 placeholder,
 hideLabel = true,
}) {
 return (
  <div className="flex flex-col space-y-2 w-full">
   {hideLabel && (
    <label
     htmlFor={id}
     className="text-sm font-medium text-white"
     aria-label={placeholder}
    >
     {label}
    </label>
   )}
   <textarea
    id={id}
    placeholder={placeholder}
    rows={4}
    aria-required="true"
    className="border bg-transparent text-white border-custom_line_two rounded-md px-3 py-2 outline-none focus:border-custom_line_one placeholder:capitalize placeholder:text-custom_line_one resize-none"
   ></textarea>
  </div>
 );
}
