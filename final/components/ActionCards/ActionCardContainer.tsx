import React from "react";

function ActionCardContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4 justify-center m-4">{children}</div>;
}

export default ActionCardContainer;
