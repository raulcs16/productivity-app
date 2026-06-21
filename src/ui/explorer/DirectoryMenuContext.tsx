"use client";

import ContextMenu, { ContextMenuItem } from "../shared/controls/ContextMenu";
import FileSvg from "../shared/svg/FileSvg";

interface DirectoryMenuContextProps {
  directoryId: number;
  x: number;
  y: number;
  open: boolean;
  onClose: () => void;
  onRename: (dirId: number) => void;
  onAddFile: (directoryId: number) => void;
}

export default function DirectoryMenuContext(props: DirectoryMenuContextProps) {
  return (
    <ContextMenu
      x={props.x}
      y={props.y}
      open={props.open}
      onClosed={() => {
        props.onClose();
      }}
    >
      <ContextMenuItem
        text="Rename"
        onTriggered={() => props.onRename(props.directoryId)}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        }
      ></ContextMenuItem>
      <ContextMenuItem
        text="add file"
        onTriggered={() => props.onAddFile(props.directoryId)}
        icon={<FileSvg width={10} height={10}></FileSvg>}
      ></ContextMenuItem>
    </ContextMenu>
  );
}
