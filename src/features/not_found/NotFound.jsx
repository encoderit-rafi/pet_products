import BaseButton from "@/components/buttons/BaseButton";
import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen bg-custom_bg_one flex items-center justify-center">
      <div className="text-red-500 w-full max-w-sm">
        <h6 className="text-5xl font-semibold text-center">404 Not Found</h6>
        <NavLink to="/">
          <BaseButton
            // to="/"
            variant="gradient"
            className={"mt-10"}
          >
            go to home
          </BaseButton>
        </NavLink>
      </div>
    </div>
  );
}
