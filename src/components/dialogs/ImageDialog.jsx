import React, { useState } from "react";
import Dialog from "./Dialog";
import ImagePreview from "../file_pickers/ImagePreview";
import cn from "@/lib/utils/cn";

export default function ImageDialog({ src, name, className }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={name}
        aria-label={name}
        className={cn(
          "object-cover object-center rounded-full size-5 cursor-pointer",
          className
        )}
        onError={(e) => (e.target.src = "/placeholder-image.webp")}
        onClick={() => setIsOpen(true)}
      />
      <Dialog isOpen={isOpen} title={""} className="w-fit">
        <ImagePreview
          src={src}
          onClickClose={() => setIsOpen(false)}
          className={"w-80"}
        />
      </Dialog>
    </>
  );
}
