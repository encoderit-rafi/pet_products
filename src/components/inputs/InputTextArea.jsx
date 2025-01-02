import cn from "@/lib/utils/cn";
import Label from "../texts/Label";

export default function InputTextArea({
  id,
  label,
  placeholder,
  className,
  hideLabel = false,
}) {
  return (
    <div className="flex flex-col w-full space-y-2">
      {!hideLabel && <Label id={id} palceholder={placeholder} label={label} />}
      <textarea
        id={id}
        placeholder={placeholder}
        rows={4}
        aria-required="true"
        className={cn("base-input resize-none", className)}
      ></textarea>
    </div>
  );
}
