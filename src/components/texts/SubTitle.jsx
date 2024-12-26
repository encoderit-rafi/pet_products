import React from "react";

export default function SubTitle({ children }) {
  return (
    <h3 className="text-sm font-light capitalize text-custom_text_two">
      {children}
    </h3>
  );
}
