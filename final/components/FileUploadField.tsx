import CloseIcon from "@/icons/CloseIcon";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { FileType, addFile, removeFile } from "@/features/file/fileSlice";
import { readFileAsText } from "@/utils/readFiles";
import NewChatButton from "./Sidebar/NewChatButton";

//! Fix: Prevent duplicate files from being uploaded
//! Fix: Prevent more than 3 files from being uploaded
//! Fix: Prevent files with invalid types from being uploaded
//! Fix: Prevent files with same name from being uploaded

const MAX_FILES = 3;
const allowedTypes: string[] = ["text/css", "text/javascript", "text/html"];

const FileUploadField: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const files = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  const readFilesAndDispatch = async (files: File[]) => {
    const allowedExtensions = ["js", "css", "html"];
    const newFiles: FileType[] = [];

    for (const file of files) {
      try {
        const fileAsText = await readFileAsText(file);
        const fileName = file.name;
        const fileExtension = fileName.match(/\.([^.]+)$/)?.[1];

        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
          toast.error("Only CSS, HTML, and JS files are allowed");
          continue;
        }

        const type = fileExtension as "js" | "css" | "html";

        if (!fileAsText) {
          toast.error(`Failed to read file "${fileName}"`);
          continue;
        }

        newFiles.push({ name: fileName, content: fileAsText, type });
      } catch (err: any) {
        toast.error(`Failed to read file "${file.name}": ${err.message}`);
      }
    }

    dispatch(addFile(newFiles));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (files.length >= MAX_FILES || e.dataTransfer.files.length > MAX_FILES) {
      toast.error("You can only upload 3 files");
      return;
    }
    const newFiles = Array.from(e.dataTransfer.files).slice(0, MAX_FILES);
    const validFiles = newFiles.filter(
      (file) =>
        allowedTypes.includes(file.type) ||
        !files.some((f) => f.name === file.name)
    );

    if (validFiles.length === 0) {
      toast.error("Only CSS, HTML, and JS files are allowed");
      return;
    }

    if (validFiles.length !== newFiles.length) {
      toast.error(
        "Only CSS, HTML, and JS files are allowed, some files were ignored"
      );
    }

    readFilesAndDispatch(validFiles);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 mb-4 w-full ${
        files.length === 3 ? "border-accent" : "border-primary"
      }`}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {files.length === 0 ? (
        <div className="text-base-content text-center">
          Drag and drop your files here or click to browse
        </div>
      ) : (
        <div className="flex gap-2 w-full">
          {files.map((file) => (
            <div
              key={file.name}
              className="bg-accent text-accent-content rounded-md p-2 px-3 relative flex w-1/3"
            >
              <div className="text-sm flex-1">{file.name}</div>
              <CloseIcon
                className="absolute -top-1 -right-1 w-5 h-5 text-error cursor-pointer hover:text-red-500"
                onClick={() => dispatch(removeFile(file))}
              />
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        className="hidden"
        multiple
        onChange={(e) => {
          const newFiles = Array.from(e.target.files!).slice(0, MAX_FILES);
          let validFiles = newFiles.filter((file) =>
            allowedTypes.includes(file.type)
          );
          if (files.length + validFiles.length > MAX_FILES) {
            toast.error("You can only upload 3 files");
            return;
          }

          readFilesAndDispatch(validFiles);
        }}
      />
      {files.length < MAX_FILES ? (
        <button
          className={`mt-4 btn btn-block ${
            files.length === 3 ? "btn-accent" : "btn-primary"
          }`}
          onClick={() => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.multiple = true;
            fileInput.accept = allowedTypes.join(",");
            fileInput.addEventListener("change", (e) => {
              const newFiles = Array.from(
                (e.target as HTMLInputElement).files!
              ).slice(0, MAX_FILES);

              if (files.length + newFiles.length > MAX_FILES) {
                toast.error("You can only upload 3 files");
                return;
              }
              let validFiles = newFiles.filter((file) =>
                allowedTypes.includes(file.type)
              );

              if (validFiles.length === 0) {
                toast.error("Only CSS, HTML, and JS files are allowed");
                return;
              }

              if (validFiles.length !== newFiles.length) {
                toast.error(
                  "Only CSS, HTML, and JS files are allowed, some files were ignored"
                );
              }

              readFilesAndDispatch(validFiles);
            });
            fileInput.click();
          }}
        >
          {files.length === 3 ? "Ready" : "Upload Files"}
        </button>
      ) : (
        <NewChatButton />
      )}
    </div>
  );
};

export default FileUploadField;
