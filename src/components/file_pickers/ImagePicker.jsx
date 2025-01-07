import UploadFileIcon from "@/assets/icons/UploadFileIcon";
import React, { useState } from "react";

export default function ImagePicker({ multiple = false, images, setImages }) {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    // Only update state if there are selected files
    if (selectedFiles.length > 0) {
      multiple
        ? setImages((prev) => [...prev, ...selectedFiles])
        : setImages([...selectedFiles]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* File Picker */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-custom_line_one hover:bg-custom_bg_one"
      >
        <div className="flex flex-col items-center">
          {/* SVG Icon */}
          <div className="p-3 mb-2 rounded-lg text-custom_text_two bg-custom_bg_ten size-10">
            <UploadFileIcon />
          </div>
          <p className="font-medium text-custom_text_two">Upload Images</p>
          <p className="text-xs font-normal text-custom_text_seven">Jpeg, Png</p>
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

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="flex items-center w-full gap-2 overflow-x-auto">
          {images.map((file, index) => (
            <div key={index} className="relative group shrink-0">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="object-cover rounded-lg size-32"
              />
              {/* Cancel Button */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute text-white bg-red-500 rounded-full opacity-75 top-2 right-2 size-6 hover:opacity-100"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

