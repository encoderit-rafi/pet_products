import React from "react";

export default function ButtonGradient({ children }) {
  return (
    <button className="w-full p-1.5 px-3 font-medium rounded-lg whitespace-nowrap bg-gradient-to-r from-lime-600 from-60% to-lime-500 text-lg capitalize">
      {children}
    </button>
  );
}
