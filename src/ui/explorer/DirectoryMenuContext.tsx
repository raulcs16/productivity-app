"use client";

import ContextMenu, { ContextMenuItem } from "../controls/ContextMenu";

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
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-emerald-500/70 group-hover:text-emerald-400"
          >
            {/* Document page outline with a dog-eared corner top right */}
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            {/* Plus line: horizontal */}
            <line x1="9" y1="15" x2="15" y2="15" />
            {/* Plus line: vertical */}
            <line x1="12" y1="12" x2="12" y2="18" />
          </svg>
        }
      ></ContextMenuItem>
    </ContextMenu>
  );
}
