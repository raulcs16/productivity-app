import { FDDirectory } from "@/src/core/flat-directory/directory";
import FileView from "./FileView";

interface ExplorerProps {
  directories: FDDirectory[];
  onFileContextMenu: (
    dirId: number,
    fileId: number,
    x: number,
    y: number
  ) => void;
  onDirContextMenu: (dirId: number, x: number, y: number) => void;
  onExplorerContextMenu: (x: number, y: number) => void;
}
export default function Explorer(props: ExplorerProps) {
  return (
    <div
      className="w-full h-full"
      onContextMenu={(e) => {
        e.preventDefault();
        props.onExplorerContextMenu(e.clientX, e.clientY);
      }}
    >
      <h1 className="px-2 py-1 text-sm">{"Explorer"}</h1>
      {props.directories.map((fd, index) => (
        <FileView
          key={index}
          id={fd.id}
          title={fd.title}
          files={fd.files}
          onClicked={(id) => {}}
          onFileClicked={(fileId, dirId) => {}}
          onFileContextMenu={(dirId, fileId, x, y) => {
            props.onFileContextMenu(dirId, fileId, x, y);
          }}
          onDirectoryContextMenu={(dirId, x, y) => {
            props.onDirContextMenu(dirId, x, y);
          }}
        ></FileView>
      ))}
    </div>
  );
}
