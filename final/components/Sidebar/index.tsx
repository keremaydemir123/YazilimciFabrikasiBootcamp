"use client";

import React, { useEffect, useState } from "react";
import SidebarContainer from "./SidebarContainer";
import FileLink from "./FileLink";
import FileUploadField from "../FileUploadField";
import { readFileAsText } from "@/utils/readFiles";
import NewChatButton from "./NewChatButton";
import ChatHistory from "./ChatHistory";
import Collapse from "../Collapse";
import Files from "./Files";
import { useAppSelector } from "@/features/store";
import { FileType } from "@/features/file/fileSlice";

type FileState = {
  name: string | null;
  content: string | null;
};

function Sidebar() {
  const files = useAppSelector((state) => state.files);

  // TODO: Fix state and file upload

  return (
    <SidebarContainer>
      <FileUploadField />
      <Collapse Heading={<div>Current Files</div>}>
        <Files>
          {files.map((file) => {
            return <FileLink fileName={file.name} key={file.name} />;
          })}
        </Files>
      </Collapse>
      <Collapse Heading={<div>History</div>}>
        <ChatHistory />
      </Collapse>
    </SidebarContainer>
  );
}

export default Sidebar;
