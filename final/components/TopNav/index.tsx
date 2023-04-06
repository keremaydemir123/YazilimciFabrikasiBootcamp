"use client";

import React from "react";
import TopNavContainer from "./TopNavContainer";
import TopNavBox from "./TopNavBox";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function TopNav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const chatId = pathname?.split("/")[2];

  const [files, loadingFiles, errorFiles] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", chatId!, "files")
  );

  if (loadingFiles) return <div>Loading...</div>;

  return (
    <TopNavContainer>
      {files?.docs[0]?.data().files.map((file: any) => {
        const newHref = replaceLastPart(pathname!, file.name);
        return (
          <TopNavBox
            href={newHref}
            key={file.name}
            active={pathname?.includes(file.name)}
          >
            {file.name}
          </TopNavBox>
        );
      })}
    </TopNavContainer>
  );
}

export default TopNav;

function replaceLastPart(str: string, newLastPart: string) {
  const lastSlashIndex = str.lastIndexOf("/");
  const newStr = str.slice(0, lastSlashIndex + 1) + newLastPart;
  return newStr;
}
