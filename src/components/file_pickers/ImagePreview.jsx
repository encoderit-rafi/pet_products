import CloseIcon from "@/assets/icons/CloseIcon";
import cn from "@/lib/utils/cn";
import React from "react";

export default function ImagePreview({
  src,
  onClickClose,
  hideCloseButton = false,
  className,
}) {
  return (
    <div className={cn("relative group shrink-0 mx-auto size-96", className)}>
      {/* {src} */}
      <img
        src={src}
        alt="preview"
        className="object-contain rounded-lg size-full"
        onError={(e) => (e.target.src = "/placeholder-image.webp")}
      />
      {!hideCloseButton && (
        <button
          type="button"
          onClick={onClickClose}
          className="absolute flex items-center justify-center text-white bg-red-500 rounded-full opacity-85 top-2 right-2 size-6 hover:opacity-100"
        >
          {/* &times; */}
          <CloseIcon className="size-3" />
        </button>
      )}
    </div>
  );
}
