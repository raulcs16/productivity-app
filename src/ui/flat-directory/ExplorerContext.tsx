"use client";

import ContextMenu, { ContextMenuItem } from "../controls/ContextMenu";

interface ExplorerMenuContextProps {
  x: number;
  y: number;
  open: boolean;
  onClose: () => void;
  onAddWorkSpace: () => void;
}

export default function ExplorerMenuContext(props: ExplorerMenuContextProps) {
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
        text="add workspace"
        onTriggered={() => props.onAddWorkSpace()}
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
            {/* The structural tabbed folder outline */}
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            {/* Plus sign nested cleanly over the layout */}
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        }
      ></ContextMenuItem>
    </ContextMenu>
  );
}
