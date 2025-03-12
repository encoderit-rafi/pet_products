import React from "react";
import Title from "../texts/Title";
import cn from "@/lib/utils/cn";

export default function Page({
  className,
  title,
  actions,
  header,
  children,
  footer,
}) {
  return (
    <div
      className={cn("flex flex-col h-full gap-4 overflow-hidden", className)}
    >
      <div className="">
        <div className="flex items-center justify-between shrink-0">
          <Title> {title}</Title>

          <div className="flex items-center gap-4">{actions}</div>
        </div>
        <div className="">{header}</div>
      </div>
      {/* <div className="flex-1 overflow-auto flex flex-col">{children}</div> */}
      {children}
      <div className="shrink-0">{footer}</div>
    </div>
  );
}
