"use client";

import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "@/firebase";
import TrashIcon from "@/icons/TrashIcon";
import { FileType } from "@/features/file/fileSlice";
import Link from "next/link";

function ChatCollapse({ id }: { id: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages, loadingMessages, errorMessages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  const [files, loadingFiles, errorFiles] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "files")
  );

  useLayoutEffect(() => {
    if (!pathname) return;

    if (pathname.includes(id)) {
      setActive(true);
    } else {
      setActive(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, id]);

  const removeChat = async () => {
    // TODO not working make your own collapse component
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <div className="collapse rounded-lg">
      <input type="checkbox" className="peer" />
      <div
        className={`collapse-title peer-checked:bg-primary peer-checked:text-primary-content flex w-full ${
          active
            ? "bg-primary text-primary-content"
            : "bg-base-300 text-base-content"
        }`}
      >
        <span className="flex-1 mr-4">
          {messages?.docs[messages.docs.length - 1]?.data().text || "New Text"}
        </span>
        <TrashIcon className="w-8 h-8 text-error" onClick={removeChat} />
      </div>
      <div className="collapse-content peer-checked:bg-primary peer-checked:text-primary-content flex flex-col gap-1">
        {files?.docs[0]?.data().files.map((file: FileType) => {
          return (
            <Link
              href={`/chat/${id}/files/${file.name}`}
              key={file.name}
              className="hover:underline"
            >
              {file.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ChatCollapse;
