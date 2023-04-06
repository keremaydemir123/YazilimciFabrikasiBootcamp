"use client";

import LogoutIcon from "@/icons/LogoutIcon";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function NavbarUser() {
  const { data: session } = useSession();

  return (
    <div>
      {session && (
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div>{session.user?.name}</div>
            <div
              className="flex gap-2 items-center cursor-pointer hover:opacity-70 text-sm "
              onClick={() => signOut()}
            >
              <span className="text-base-content/80">Logout</span>{" "}
              <LogoutIcon className="w-5 h-5" />
            </div>
          </div>
          <Image
            src={session.user?.image!}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full hover:opacity-70 cursor-pointer"
            width={48}
            height={48}
          />
        </div>
      )}
    </div>
  );
}

export default NavbarUser;
