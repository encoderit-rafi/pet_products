import UploadFileIcon from "@/assets/icons/UploadFileIcon";
import React, { useRef } from "react";
import ImagePreview from "./ImagePreview";
import cn from "@/lib/utils/cn";

export default function ImagePicker({
  multiple = false,
  images,
  setImages,
  isError,
  title = "Upload Images",
  subTitle = "Jpeg, Png (max size 2 MB)",
  accept = "image/jpeg, image/png",
  hidePreview = false,
}) {
  const inputRef = useRef(null);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles?.length > 0) {
      multiple
        ? setImages((prev) => [...prev, ...selectedFiles])
        : setImages(selectedFiles);
    }
    e.target.value = ""; // Reset the input value to allow selecting the same file again
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {images?.length === 0 && (
        <>
          <div
            className={cn(
              "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-custom_line_one hover:bg-custom_bg_one",
              {
                "border-red-500": isError,
              }
            )}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <div className="p-3 mb-2 rounded-lg text-custom_text_two bg-custom_bg_ten size-10">
              <UploadFileIcon />
            </div>
            <p className="font-medium text-custom_text_two">{title}</p>
            <p className="text-xs font-normal text-custom_text_seven">
              {subTitle}
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}

      {!hidePreview && images?.length > 0 && (
        <div className="flex items-center w-full gap-2 overflow-x-auto">
          {images?.map((file, index) => (
            <ImagePreview
              className={"size-48"}
              key={index}
              src={URL.createObjectURL(file)}
              onClickClose={() => handleRemoveImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
