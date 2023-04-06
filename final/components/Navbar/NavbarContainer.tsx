import React from "react";

function NavbarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center w-full h-20 px-8 bg-base-300">
      {children}
    </div>
  );
}

export default NavbarContainer;
