"use client";

import React, { ChangeEvent, useRef } from "react";
import { toast } from "react-hot-toast";

import PaperPlane from "@/icons/PaperPlane";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";

function SearchInput() {
  // TODO Seperate async logic from component

  const ref = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const params = useSearchParams();
  const chatId = params?.get("chatId");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let inputValCopy = "";
    if (ref.current) {
      const { value } = ref.current;
      inputValCopy = value.trim();
      if (value.trim() === "") return;
      ref.current.value = "";
      ref.current.style.height = "auto";
    }

    const message: Message = {
      text: inputValCopy,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId as string,
        "messages"
      ),
      message
    );

    const notification = toast.loading("Generating response...");

    const model = "text-davinci-003";

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputValCopy,
        model,
        chatId,
        session,
      }),
    }).then(() => {
      toast.success("Message sent!", { id: notification });
    });
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex rounded-lg bg-base-200 items-center py-2 mt-4"
    >
      <textarea
        placeholder="Ask about your code!"
        rows={1}
        onInput={handleInput}
        ref={ref}
        className="outline-none bg-transparent flex-1 rounded-lg px-4 text-base-content resize-none overflow-hidden h-6 text-md"
      />
      <button className="">
        <PaperPlane className="w-7 h-7 mr-4" />
      </button>
    </form>
  );
}

export default SearchInput;
