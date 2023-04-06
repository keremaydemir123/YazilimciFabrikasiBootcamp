import React from "react";

function SidebarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-200 text-base-content p-4 w-full h-full flex-1 overflow-y-auto hidden md:flex flex-col gap-2">
      {children}
    </div>
  );
}

export default SidebarContainer;
