import React from "react";
import BorderBox from "@/components/box/BorderBox";

export default function UserCardSkeleton() {
  return (
    <BorderBox className="p-2 lg:p-2 !border-custom_bg_one animate-pulse">
      <div className="flex items-center gap-2">
        {/* Skeleton for image */}
        <div className="size-14 bg-custom_bg_one rounded-2xl">
          <div className="rounded-lg bg-custom_bg_one w-14 h-14"></div>
        </div>
        {/* Skeleton for text */}
        <div className="flex flex-col justify-center flex-1 space-y-1">
          <div className="w-3/4 h-3 rounded bg-custom_bg_one"></div>
          <div className="w-1/2 h-2 rounded bg-custom_bg_one"></div>
        </div>
        {/* Skeleton for icons */}
        <div className="flex items-center justify-center gap-2">
          <div className="rounded-lg bg-custom_bg_one size-10"></div>
          <div className="rounded-lg bg-custom_bg_one size-10"></div>
        </div>
      </div>
    </BorderBox>
  );
}
