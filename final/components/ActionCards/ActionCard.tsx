"use client";

import React from "react";

function ActionCard({ children }: { children: React.ReactNode }) {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={`${
        isSelected && "selected border border-primary"
      } bg-base-300 p-4 flex flex-col justify-center items-center w-44 h-44 rounded-lg shadow-lg hover:bg-base-200 cursor-pointer transition-colors duration-150`}
    >
      {children}
    </div>
  );
}

export default ActionCard;
