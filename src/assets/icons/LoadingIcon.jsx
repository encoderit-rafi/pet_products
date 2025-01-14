import React from "react";

export default function LoadingIcon({ className }) {
  return (
    // <svg
    //   className={className}
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   width={"100%"}
    //   height={"100%"}
    // >
    //   <path
    //     fill="none"
    //     stroke="currentColor"
    //     strokeDasharray="16"
    //     strokeDashoffset="16"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     strokeWidth="2"
    //     d="M12 3c4.97 0 9 4.03 9 9"
    //   >
    //     <animate
    //       fill="freeze"
    //       attributeName="strokeDashoffset"
    //       dur="0.2s"
    //       values="16;0"
    //     />
    //     <animateTransform
    //       attributeName="transform"
    //       dur="1.5s"
    //       repeatCount="indefinite"
    //       type="rotate"
    //       values="0 12 12;360 12 12"
    //     />
    //   </path>
    // </svg>
    <div className="animate-spin size-full">
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M988 548c-19.9 0-36-16.1-36-36c0-59.4-11.6-117-34.6-171.3a440.5 440.5 0 0 0-94.3-139.9a437.7 437.7 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150s83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3c.1 19.9-16 36-35.9 36"
        />
      </svg>
    </div>
  );
}
