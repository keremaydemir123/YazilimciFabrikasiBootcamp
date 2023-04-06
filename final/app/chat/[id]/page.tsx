"use client";

import React from "react";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";

import ActionCard from "@/components/ActionCards/ActionCard";
import ActionCardContainer from "@/components/ActionCards/ActionCardContainer";
import ColorfulHeader from "@/components/ColorfulHeader";
import SearchInput from "@/components/SearchInput";
import { db } from "@/firebase";
import CommentIcon from "@/icons/CommentIcon";
import RocketIcon from "@/icons/RocketIcon";
import WrenchIcon from "@/icons/WrenchIcon";
import { FileType } from "@/features/file/fileSlice";
import Image from "next/image";

function ChatPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const chatId = pathname?.split("/")[2];

  const [files, loadingFiles, errorFiles] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", chatId!, "files")
  );

  if (loadingFiles) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full ">
      <section className="flex-1 prose overflow-y-auto">
        <div className="w-full text-center">
          <ColorfulHeader
            text="Select Your Files and Actions"
            from="from-primary"
            to="to-secondary"
            size="text-4xl"
          />
        </div>
        <ActionCardContainer>
          {files?.docs[0]?.data()?.files?.map((file: FileType) => {
            let src;
            const fileExtension = file.name.split(".")[1];
            switch (fileExtension) {
              case "js":
                src = "/js.svg";
                break;
              case "html":
                src = "/html.svg";
                break;
              case "css":
                src = "/css.svg";
                break;
              default:
                src = "/js.svg";
                break;
            }

            return (
              <ActionCard key={file.name}>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={src}
                    height={50}
                    width={50}
                    alt={file.name}
                    className="action-card-icon"
                  />
                  <div className="action-card-text">{file.name}</div>
                </div>
              </ActionCard>
            );
          })}
        </ActionCardContainer>
        <ActionCardContainer>
          <ActionCard>
            <WrenchIcon className="action-card-icon" />
            <span className="action-card-text">Fix Your Code</span>
          </ActionCard>
          <ActionCard>
            <RocketIcon className="action-card-icon text-secondary" />
            <span className="action-card-text">Refactor</span>
          </ActionCard>
          <ActionCard>
            <CommentIcon className="action-card-icon text-accent" />
            <span className="action-card-text">Add Comments</span>
          </ActionCard>
        </ActionCardContainer>
      </section>
      <p className="text-center text-base-content">
        You can use Input for detailed explanations, or you can left it blank.
      </p>
      <SearchInput />
    </div>
  );
}

export default ChatPage;
