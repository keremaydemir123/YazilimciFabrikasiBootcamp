import React from "react";

function TopNavContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center h-12 bg-base-200 rounded-lg w-max overflow-hidden mb-4">
      {children}
    </div>
  );
}

export default TopNavContainer;
