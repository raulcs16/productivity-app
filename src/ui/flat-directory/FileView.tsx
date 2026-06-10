"use client";
import { FDFile } from "@/src/core/flat-directory/file";
import FileDelegate from "./FileDelegate";

interface FileViewProps {
  id: number;
  title: string;
  files: FDFile[];
  onClicked: (id: number) => void;
  onFileClicked: (fileId: number, directoryId: number) => void;
  onFileContextMenu: (
    directoryId: number,
    fileId: number,
    x: number,
    y: number
  ) => void;
  onDirectoryContextMenu: (directoryId: number, x: number, y: number) => void;
}
export default function FileView(props: FileViewProps) {
  return (
    <div className="w-full">
      <h1
        className="font-bold py-1 text-blue-500 px-2 cursor-pointer hover:bg-slate-400"
        onClick={() => {
          props.onClicked(props.id);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onDirectoryContextMenu(props.id, e.clientX, e.clientY);
        }}
      >
        {props.title}
      </h1>
      <ol className="w-full">
        {props.files.map((file, index) => (
          <FileDelegate
            key={index}
            id={file.id}
            title={file.title}
            onSelected={(fileId) => {
              props.onFileClicked(fileId, props.id);
            }}
            onContextMenu={(fileId, x, y) => {
              props.onFileContextMenu(props.id, fileId, x, y);
            }}
          ></FileDelegate>
        ))}
      </ol>
    </div>
  );
}
