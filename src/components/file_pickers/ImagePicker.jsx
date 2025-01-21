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
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles?.length > 0) {
      multiple
        ? setImages((prev) => [...prev, ...selectedFiles])
        : setImages(selectedFiles);
    }
  };
  useEffect(() => {}, [images]);
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {images?.length === 0 && (
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

      {images?.length > 0 && (
        <div className="flex items-center w-full gap-2 overflow-x-auto">
          {images.map((file, index) => (
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
// 🚧 working
// import UploadFileIcon from "@/assets/icons/UploadFileIcon";
// import React, { useEffect, useState } from "react";
// import ImagePreview from "./ImagePreview";
// import cn from "@/lib/utils/cn";
// import ImageIcon from "@/assets/icons/ImageIcon";

// export default function ImagePicker({
//   onFileChange = () => {},
//   multiple = false,
//   isError,
//   type = "base",
//   show = true,
// }) {
//   const handleFileChange = (e) => {
//     console.log("✅ File input change triggered");
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles?.length > 0) {
//       console.log("✅ Files selected in ImagePicker:", selectedFiles);
//       if (typeof onFileChange === "function") {
//         onFileChange(selectedFiles);
//       } else {
//         console.error("onFileChange is not a function.");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {show && (
//         <label htmlFor="file-upload" className="w-full">
//           {type === "icon" ? (
//             <div className="flex items-center justify-center px-6 py-3 bg-transparent border rounded-full cursor-pointer text-custom_yellow border-custom_line_nine">
//               <ImageIcon className="size-5" />
//             </div>
//           ) : (
//             <div
//               className={cn(
//                 "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer border-custom_line_one hover:bg-custom_bg_one",
//                 {
//                   "border-red-500": isError,
//                 }
//               )}
//             >
//               <div className="p-3 mb-2 rounded-lg text-custom_text_two bg-custom_bg_ten size-10">
//                 <UploadFileIcon />
//               </div>
//               <p className="font-medium text-custom_text_two">Upload Images</p>
//               <p className="text-xs font-normal text-custom_text_seven">
//                 Jpeg, Png (max size 2 MB)
//               </p>
//             </div>
//           )}
//           <input
//             id="file-upload"
//             type="file"
//             multiple={multiple}
//             accept="image/jpeg, image/png"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </label>
//       )}
//     </div>
//   );
// }
// 🚧 working
