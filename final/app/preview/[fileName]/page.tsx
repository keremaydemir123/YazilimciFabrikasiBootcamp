"use client";

import Markdown from "@/components/Markdown";
import { useAppSelector } from "@/features/store";

type Props = {
  params: {
    fileName: string;
  };
};

function PreviewPage(props: Props) {
  const files = useAppSelector((state) => state.files);

  const file = files.find((file) => file.name === props.params.fileName);

  const fileContentRaw = file?.content;
  const fileName = file?.name;

  if (!fileContentRaw || !fileName) {
    return <div>File not found</div>;
  }

  let fileContent: string;
  if (fileName.endsWith(".html")) {
    fileContent = `~~~html\n${fileContentRaw}\n~~~`;
  } else if (fileName.endsWith(".css")) {
    fileContent = `~~~css\n${fileContentRaw}\n~~~`;
  } else if (fileName.endsWith(".js")) {
    fileContent = `~~~js\n${fileContentRaw}\n~~~`;
  }

  const altered = fileContentRaw + "\n hello this is different \n";
  console.log(altered);

  return (
    <div className="overflow-y-auto h-full">
      <Markdown markdown={{ content: fileContent! }} />
    </div>
  );
}

export default PreviewPage;
