import React from "react";
import NavbarContainer from "./NavbarContainer";
import NavbarLeft from "./NavbarLeft";
import NavbarRight from "./NavbarRight";
import NavbarUser from "./NavbarUser";
import Link from "next/link";

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarLeft>
        <Link
          href="/"
          className="text-accent text-3xl font-bold tracking-wider"
        >
          <span className="text-primary">Co</span>
          <span className="text-secondary">Fix</span>
          <span className="text-accent">GPT</span>
        </Link>
      </NavbarLeft>
      <NavbarRight>
        <NavbarUser />
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;
