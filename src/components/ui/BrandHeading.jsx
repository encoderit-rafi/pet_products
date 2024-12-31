import React from "react";

export default function BrandHeading() {
  return (
    <div className="space-y-3 text-center lg:space-y-5 animate-fade">
      <h5 className="text-xs font-normal leading-none tracking-[0.3rem] uppercase text-custom_text_one">
        brand manager
      </h5>
      <h1 className="text-3xl font-medium capitalize lg:font-semibold lg:text-4xl text-custom_text_two">
        Manage Your <br />
        Brand Analytics & Reports!
      </h1>
    </div>
  );
}
