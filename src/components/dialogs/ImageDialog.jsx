import React, { useState } from "react";
import Dialog from "./Dialog";
import ImagePreview from "../file_pickers/ImagePreview";

export default function ImageDialog({ src, name }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={name}
        aria-label={name}
        className="object-cover object-center rounded-full size-5 cursor-pointer"
        onError={(e) => (e.target.src = "/placeholder-image.webp")}
        onClick={() => setIsOpen(true)}
      />
      <Dialog isOpen={isOpen} title={""} className="w-fit">
        <ImagePreview
          src={src}
          onClickClose={() => setIsOpen(false)}
          className={"size-64"}
        />
      </Dialog>
    </>
  );
}
