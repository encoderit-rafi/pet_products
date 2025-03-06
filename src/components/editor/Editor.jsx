import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const Editor = ({ mood, value, setValue }) => {
  // const [value, setValue] = useState(() => initialValue);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
      [{ font: [] }], // Fonts
      [{ size: [] }], // Font sizes
      ["bold", "italic", "underline", "strike"], // Basic formatting
      [{ color: [] }, { background: [] }], // Text and background color
      [{ script: "sub" }, { script: "super" }], // Subscript / superscript
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ direction: "rtl" }], // Text direction
      [{ align: [] }], // Alignments
      ["blockquote", "code-block"], // Blockquote & Code block
      ["link", "image", "video"], // Media
      ["clean"], // Remove formatting
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      {mood == "view" ? (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <ReactQuill
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Start typing..."
          // className="!placeholder:text-white"
        />
      )}
      {/* <p>Editor Output:</p> */}
    </div>
  );
};

export default Editor;
