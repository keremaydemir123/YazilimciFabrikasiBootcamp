import Image from "next/image";
import Link from "next/link";
import React from "react";

function FileLink({ fileName }: { fileName: string }) {
  if (!fileName) return null;

  let src: string;
  if (fileName.endsWith(".js")) src = "/js.svg";
  else if (fileName.endsWith(".css")) src = "/css.svg";
  else if (fileName.endsWith(".html")) src = "/html.svg";
  else return null;

  return (
    <Link
      href={`/preview/${fileName}`}
      className="bg-base-200 p-2 rounded-md hover:bg-base-300 flex items-center gap-2"
    >
      <Image src={src} alt="file icon" width={24} height={24} />
      <span>{fileName}</span>
    </Link>
  );
}

export default FileLink;
