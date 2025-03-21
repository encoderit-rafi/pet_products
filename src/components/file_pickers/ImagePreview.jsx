import CloseIcon from "@/assets/icons/CloseIcon";
import DocIcon from "@/assets/icons/DocIcon";
import FileIcon from "@/assets/icons/FileIcon";
import PdfIcon from "@/assets/icons/PdfIcon";
import cn from "@/lib/utils/cn";
import React from "react";

export default function ImagePreview({
  src,
  onClickClose,
  attachments,
  hideCloseButton = false,
  className,
}) {
  console.log("🚀 ~ attachments:", attachments);
  const isImage = (ext) =>
    [
      "png",
      "jpg",
      "jpeg",
      "gif",
      "webp",
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ].includes(ext);
  const handelIcon = (ext) => {
    switch (ext) {
      case "pdf":
        return <PdfIcon className={"size-12"} />;
      case "application/pdf":
        return <PdfIcon className={"size-12"} />;

      // case "doc":
      //   return <DocIcon className={"size-4"} />;

      default:
        return <FileIcon className={"size-12"} />;
    }
  };
  return (
    <div className={cn("relative group shrink-0 mx-auto w-fit ", className)}>
      {/* {src} */}
      {isImage(attachments?.type) ? (
        <img
          src={src}
          alt="preview"
          className="object-contain rounded-lg size-full"
          onError={(e) => (e.target.src = "/placeholder-image.webp")}
        />
      ) : (
        <div className="flex size-36 flex-col items-center justify-center gap-2">
          {handelIcon(attachments?.type)}
          <span>{attachments?.name}</span>
        </div>
      )}
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
