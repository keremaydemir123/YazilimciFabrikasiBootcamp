import React from "react";

function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {children}
    </div>
  );
}

export default ContentContainer;
