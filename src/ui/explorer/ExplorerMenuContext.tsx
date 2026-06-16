"use client";

import ContextMenu, { ContextMenuItem } from "../shared/controls/ContextMenu";
import FolderSvg from "../shared/svg/FolderSvg";

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
        icon={<FolderSvg></FolderSvg>}
      ></ContextMenuItem>
    </ContextMenu>
  );
}
