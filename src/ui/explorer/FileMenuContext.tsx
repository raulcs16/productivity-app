"use client";

import { propagateServerField } from "next/dist/server/lib/render-server";
import ContextMenu, { ContextMenuItem } from "../controls/ContextMenu";

interface FileMenuContextProps {
  id: number;
  x: number;
  y: number;
  open: boolean;
  onClose: () => void;
  onRename: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function FileMenuContext(props: FileMenuContextProps) {
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
        onTriggered={() => props.onRename(props.id)}
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
        text="delete"
        onTriggered={() => props.onDelete(props.id)}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-rose-500/70 group-hover:text-rose-400"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        }
      ></ContextMenuItem>
    </ContextMenu>
  );
}
