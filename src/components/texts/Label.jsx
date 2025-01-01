import React from "react";

export default function Label({ id, label, palceholder }) {
  return (
    <label
      htmlFor={id}
      className="text-sm font-normal leading-none capitalize text-custom_text_twelve"
      aria-label={palceholder}
    >
      {label}
    </label>
  );
}
