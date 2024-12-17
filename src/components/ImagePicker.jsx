import React, { useState } from "react";

export default function ImagePicker() {
 const [images, setImages] = useState([]);

 // Handle file selection
 const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files || []);
  setImages((prev) => [...prev, ...selectedFiles]);
 };

 // Handle image removal
 const handleRemoveImage = (index) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
 };

 return (
  <div className="flex flex-col items-center space-y-4">
   {/* File Picker */}
   <label
    htmlFor="file-upload"
    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-custom_line_one rounded-lg cursor-pointer hover:bg-custom_bg_one"
   >
    <div className="flex flex-col items-center">
     {/* SVG Icon */}
     <div className="w-12 h-12 mb-2">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth={1.5}
       stroke="currentColor"
       className="text-gray-300"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16.5v-9m0 0L8.25 9.75M12 7.5l3.75 2.25m6 10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 20.25V4.5A2.25 2.25 0 014.5 2.25h15A2.25 2.25 0 0121.75 4.5v15.75z"
       />
      </svg>
     </div>
     <p className="text-custom_text_two font-medium">Upload Images</p>
     <p className="text-gray-400 text-sm">Jpeg, Png</p>
    </div>
    <input
     id="file-upload"
     type="file"
     multiple
     accept="image/jpeg, image/png"
     className="hidden"
     onChange={handleFileChange}
    />
   </label>

   {/* Image Previews */}
   {images.length > 0 && (
    <div className="w-full flex items-center overflow-x-auto gap-2">
     {images.map((file, index) => (
      <div key={index} className="relative group shrink-0">
       <img
        src={URL.createObjectURL(file)}
        alt="preview"
        className="size-32 object-cover rounded-lg"
       />
       {/* Cancel Button */}
       <button
        onClick={() => handleRemoveImage(index)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full size-6 opacity-75 hover:opacity-100"
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
