import React from "react";

export default function Title({ children, ...props }) {
  return (
    <h2 className="text-base font-medium capitalize text-custom_text_two" {...props}>
      {children}
    </h2>
  );
}
