import CloseIcon from "@/assets/icons/CloseIcon";
import cn from "@/lib/utils/cn";
import React from "react";

export default function ImagePreview({
  src,
  onClickClose,
  // attachments,
  hideCloseButton = false,
  className,
}) {
  // console.log("🚀 ~ attachments:", attachments);
  // const isImage = (ext) => ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
  // const handelIcon = (ext) => {
  //   switch (ext) {
  //     case "pdf":
  //       return <PdfIcon className={"size-4"} />;

  //     case "doc":
  //       return <DocIcon className={"size-4"} />;

  //     default:
  //       return <FileIcon className={"size-4"} />;
  //   }
  // };
  return (
    <div className={cn("relative group shrink-0 mx-auto size-96 ", className)}>
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
          className="absolute flex items-center justify-center text-white bg-red-500 rounded-full opacity-85 size-6 top-0 right-0 hover:opacity-100"
        >
          {/* &times; */}
          <CloseIcon className="size-3" />
        </button>
      )}
    </div>
  );
}
