import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex-[3] md:flex-[2] h-full p-4 overflow-hidden">
      {children}
    </div>
  );
}

export default PageContainer;
