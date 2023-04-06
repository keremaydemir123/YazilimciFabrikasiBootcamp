import React from "react";

type Props = {
  text: string;
  from: string;
  to: string;
  size: string;
};

function ColorfulHeader({ text, from, to, size }: Props) {
  return (
    <h1
      className={`font-extrabold text-transparent break-words bg-clip-text bg-gradient-to-r leading-10 md:leading-[4rem] ${size} ${from} ${to}`}
    >
      {text}
    </h1>
  );
}

export default ColorfulHeader;
