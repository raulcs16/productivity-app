"use client";
import { FDFile } from "@/src/core/flat-directory/file";
import FileDelegate from "./FileDelegate";
import TextInput from "../controls/TextInput";
import Scrim from "../controls/Scrim";
import ContextButton from "../controls/ContextButton";

interface FileViewProps {
  id: number;
  title: string;
  files: FDFile[];
  edit: boolean;
  onClicked: (id: number) => void;
  onFileClicked: (fileId: number, directoryId: number) => void;
  onFileContextMenu: (
    directoryId: number,
    fileId: number,
    x: number,
    y: number
  ) => void;
  onDirectoryContextMenu: (directoryId: number, x: number, y: number) => void;
  onClickAway: () => void;
  onNewFile: (title: string) => void;
}
export default function FileView(props: FileViewProps) {
  return (
    <div className="w-full">
      <div className="px-2 py-1 cursor-pointer hover:bg-slate-400">
        <ContextButton
          onClick={(x, y) => {
            props.onDirectoryContextMenu(props.id, x, y);
          }}
        >
          <h1
            className="font-bold  text-blue-500"
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
        </ContextButton>
      </div>
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
      {props.edit === true ? (
        <>
          <Scrim
            z={40}
            onClickedAway={() => {
              props.onClickAway();
            }}
          />
          <div
            className="relative z-50 w-full px-2 py-1"
            style={{ zIndex: 50 }} // Forces this specific inline node to sit on top of the z-40 portal curtain
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <TextInput
              onEnter={(text) => {
                props.onNewFile(text);
              }}
              onChange={(text) => {}}
              placeHolder="file name"
              onBlur={() => {
                props.onClickAway();
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
