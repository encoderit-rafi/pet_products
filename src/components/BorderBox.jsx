import React from "react";

export default function BorderBox({ children }) {
  return (
    <div className="py-4 border !border-custom_line_two rounded-xl px-7">
      {children}
    </div>
  );
}
