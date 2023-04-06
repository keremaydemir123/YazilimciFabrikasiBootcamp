"use client";

import Markdown from "@/components/Markdown";
import SearchInput from "@/components/SearchInput";
import TopNav from "@/components/TopNav";
import { FileType } from "@/features/file/fileSlice";
import { db } from "@/firebase";
import insertMdElements from "@/utils/insertMdElements";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function FileDetails() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const chatId = pathname?.split("/")[2];

  const [files, loadingFiles, errorFiles] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", chatId!, "files")
  );

  if (loadingFiles) return <div>Loading...</div>;

  const file = files?.docs[0]?.data()?.files?.find((file: FileType) => {
    return file.name === pathname?.split("/")[4];
  });

  const mdContent = insertMdElements({ text: file?.content, type: file?.type });

  return (
    <div className="flex flex-col h-full">
      <TopNav />
      <div className="flex-1 overflow-y-auto">
        <Markdown markdown={{ content: mdContent }} />
      </div>
      <SearchInput />
    </div>
  );
}

export default FileDetails;
