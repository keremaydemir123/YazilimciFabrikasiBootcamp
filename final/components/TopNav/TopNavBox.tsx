import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  active?: boolean;
};

function TopNavBox({ children, href, active }: Props) {
  return (
    <Link
      href={href}
      className={`btn btn-ghost normal-case rounded-none min-w-[4rem] w-24 h-full p-4 ${
        active && "bg-primary text-primary-content"
      }`}
    >
      {children}
    </Link>
  );
}

export default TopNavBox;
