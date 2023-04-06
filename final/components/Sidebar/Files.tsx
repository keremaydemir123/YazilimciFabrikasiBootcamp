import React from "react";

function Files({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 mt-2">{children}</div>;
}

export default Files;
