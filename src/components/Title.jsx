import React from "react";

export default function Title({ children }) {
  return (
    <h2 className="text-base font-medium capitalize text-custom_text_two">
      {children}
    </h2>
  );
}
