import UploadFileIcon from "@/assets/icons/UploadFileIcon";
import React, { useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
import cn from "@/lib/utils/cn";
import ImageIcon from "@/assets/icons/ImageIcon";

export default function ImagePickerIcon({
  multiple = false,
  isError,
  handleFileChange,
}) {
  return (
    <label htmlFor="file-upload">
      <div
        className={cn(
          "flex items-center justify-center px-6 py-3 bg-transparent border rounded-full cursor-pointer text-custom_yellow border-custom_line_nine"
        )}
      >
        <ImageIcon className="size-5" />
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
  );
}
