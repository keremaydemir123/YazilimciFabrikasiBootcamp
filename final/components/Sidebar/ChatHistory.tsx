"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "@/firebase";
import ChatCollapse from "./ChatCollapse";

function ChatHistory() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2 mt-4">
      {chats?.docs.map((chat) => {
        return <ChatCollapse key={chat.id} id={chat.id} />;
      })}
    </div>
  );
}

export default ChatHistory;
