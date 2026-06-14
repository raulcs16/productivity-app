import { FDDirectory } from "@/src/core/flat-directory/directory";
import FileView from "./FileView";
import { useState } from "react";
import DirectoryMenuContext from "./DirectoryContext";
import ExplorerMenuContext from "./ExplorerContext";
import FileMenuContext from "./FileContext";
import TextInput from "../controls/TextInput";
import Scrim from "../controls/Scrim";
import FolderSvg from "../svg/FolderSvg";

interface ExplorerProps {
  directories: FDDirectory[];
  selectedId: number;
  onFileEdit: (dirId: number, fileId: number) => void;
  onFileDelete: (dirId: number, fileId: number) => void;
  onDirEdit: (dirId: number) => void;
  onDirAddFile: (dirId: number) => void;
  onNewDirectory: (directory: string) => void;
  onNewFile: (dirtoryId: number, newFile: string) => void;
  onFileSelected: (dirId: number, fileId: number) => void;
}
export default function Explorer(props: ExplorerProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editDir, setEditDir] = useState<number>(-1);
  const [fileMenuConfig, setFileMenuConfig] = useState<{
    dirId: number;
    fileId: number;
    x: number;
    y: number;
  } | null>(null);
  const [dirMenuConfig, setDirMenuConfig] = useState<{
    dirId: number;
    x: number;
    y: number;
  } | null>(null);
  const [expMenuConfig, setExpMenuConfig] = useState<{
    x: number;
    y: number;
  } | null>(null);
  return (
    <>
      <FileMenuContext
        x={fileMenuConfig?.x ?? 0}
        y={fileMenuConfig?.y ?? 0}
        open={fileMenuConfig !== null}
        onDelete={() => {}}
        onRename={() => {}}
        onClose={() => setFileMenuConfig(null)}
      ></FileMenuContext>
      <DirectoryMenuContext
        directoryId={dirMenuConfig?.dirId ?? -1}
        x={dirMenuConfig?.x ?? 0}
        y={dirMenuConfig?.y ?? 0}
        open={dirMenuConfig !== null}
        onAddFile={(directoyId: number) => {
          setEditDir(directoyId);
          setDirMenuConfig(null);
        }}
        onRename={() => {}}
        onClose={() => setDirMenuConfig(null)}
      ></DirectoryMenuContext>
      <ExplorerMenuContext
        x={expMenuConfig?.x ?? 0}
        y={expMenuConfig?.y ?? 0}
        open={expMenuConfig !== null}
        onClose={() => setExpMenuConfig(null)}
        onAddWorkSpace={() => {
          setEdit(true);
          setExpMenuConfig(null);
        }}
      ></ExplorerMenuContext>
      <div
        className="w-full h-full"
        onContextMenu={(e) => {
          e.preventDefault();
          setExpMenuConfig({ x: e.clientX, y: e.clientY });
        }}
      >
        <header className="w-full px-2 py-1 flex justify-between items-center">
          <h1 className="text-sm">{"Explorer"}</h1>
          <button
            onClick={() => {
              setEdit(true);
            }}
          >
            <FolderSvg></FolderSvg>
          </button>
        </header>
        {props.directories.map((fd, index) => (
          <FileView
            key={index}
            id={fd.id}
            edit={fd.id === editDir}
            title={fd.title}
            files={fd.files}
            selectedId={props.selectedId}
            onClicked={(id) => {}}
            onFileClicked={(fileId, dirId) => {
              props.onFileSelected(dirId, fileId);
            }}
            onFileContextMenu={(dirId, fileId, x, y) => {
              setFileMenuConfig({ dirId, fileId, x, y });
            }}
            onDirectoryContextMenu={(dirId, x, y) => {
              setDirMenuConfig({ dirId, x, y });
            }}
            onClickAway={() => {
              setDirMenuConfig(null);
              setEditDir(-1);
            }}
            onNewFile={(title: string) => {
              props.onNewFile(fd.id, title);
              setEditDir(-1);
            }}
          ></FileView>
        ))}
        {edit === true ? (
          <>
            <Scrim z={40} onClickedAway={() => setEdit(false)} />
            <div
              className="relative z-50 w-full px-2 py-1"
              style={{ zIndex: 50 }} // Forces this specific inline node to sit on top of the z-40 portal curtain
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <TextInput
                onEnter={(text) => {
                  props.onNewDirectory(text);
                  setEdit(false);
                }}
                onChange={(text) => {}}
                placeHolder="new workspace"
                onBlur={() => setEdit(false)}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
