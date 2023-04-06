"use client";

import { useAppSelector } from "@/features/store";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function NewChatButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const files = useAppSelector((state) => state.files);

  const createNewChat = async () => {
    const chatsDoc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      }
    );

    const filesDoc = await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatsDoc.id,
        "files"
      ),
      {
        files,
      }
    );

    router.push(`/chat/${chatsDoc.id}`);
  };

  return (
    <button
      onClick={createNewChat}
      className="btn btn-block btn-accent mt-4 disabled:btn-disabled"
      disabled={files.length != 3}
    >
      New Chat
    </button>
  );
}

export default NewChatButton;
