import UploadFileIcon from "@/assets/icons/UploadFileIcon";
import React, { useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
import cn from "@/lib/utils/cn";

export default function ImagePicker({
  multiple = false,
  images,
  setImages,
  isError,
}) {
  // const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    if (selectedFiles.length > 0) {
      multiple
        ? setImages((prev) => [...prev, ...selectedFiles])
        : setImages(selectedFiles);
    }
  };
  useEffect(() => {
  }, [images]);
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* File Picker */}
      {/* {images.length} */}
      {images.length === 0 && (
        <label
          htmlFor="file-upload"
          className={cn(
            "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-custom_line_one hover:bg-custom_bg_one",
            {
              "border-red-500": isError,
            }
          )}
        >
          <div className="flex flex-col items-center">
            <div className="p-3 mb-2 rounded-lg text-custom_text_two bg-custom_bg_ten size-10">
              <UploadFileIcon />
            </div>
            <p className="font-medium text-custom_text_two">Upload Images</p>
            <p className="text-xs font-normal text-custom_text_seven">
              Jpeg, Png (max size 2 MB)
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple={multiple}
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="flex items-center w-full gap-2 overflow-x-auto">
          {images.map((file, index) => (
            // <div key={index} className="relative mx-auto group shrink-0">
            //   <img
            //     src={URL.createObjectURL(file)} // Works now
            //     alt="preview"
            //     className="object-cover rounded-lg size-40"
            //   />
            //   <button
            //     onClick={() => handleRemoveImage(index)}
            //     className="absolute text-white bg-red-500 rounded-full opacity-75 top-2 right-2 size-6 hover:opacity-100"
            //   >
            //     &times;
            //   </button>
            // </div>
            <ImagePreview
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
