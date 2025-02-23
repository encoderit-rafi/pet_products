import React from "react";
import Title from "../texts/Title";

export default function Page({ title, actions, header, children, footer }) {
  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      <div className="">
        <div className="flex items-center justify-between shrink-0">
          <Title> {title}</Title>

          <div className="flex items-center gap-4">{actions}</div>
        </div>
        <div className="">{header}</div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
      <div className="shrink-0">{footer}</div>
    </div>
  );
}
