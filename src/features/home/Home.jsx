import Drawer from "@/components/Drawer";
import React, { useState } from "react";

export default function Home() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <div className="h-full">
      Home
      <button className="bg-red-600" onClick={() => setIsOpenDrawer(true)}>
        open drawer
      </button>
      <Drawer isOpen={isOpenDrawer} className="max-w-sm">
        <button className="bg-red-600" onClick={() => setIsOpenDrawer(false)}>
          close
        </button>
      </Drawer>
    </div>
  );
}
