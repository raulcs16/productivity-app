import { ExplorerNode } from "@/src/core/explorer/explorer";
import { SetStateAction, useEffect, useReducer, useRef, useState } from "react";
import FloatingPortal from "../shared/cards/FloatingPortal";
import TextInput from "../shared/controls/TextInput";
import Scrim from "../shared/controls/Scrim";
import ContextButton from "../shared/controls/ContextButton";

interface ExplorerContainerProps {
  node: ExplorerNode;
  children: ExplorerNode[];
  addingChild: boolean;
  renderNode: (node: ExplorerNode) => React.ReactNode;
  onContextMenu: (id: number, x: number, y: number) => void;
  registerAnchorRef: (el: HTMLDivElement | null) => void;
}
export default function ExplorerContainer(props: ExplorerContainerProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.addingChild) {
      props.registerAnchorRef(anchorRef.current);
    }
    // Cleanup if this container is unmounted or closes
    return () => props.registerAnchorRef(null);
  }, [props.addingChild]);
  return (
    <ol
      className="w-full h-full"
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onContextMenu(props.node.id, e.clientX, e.clientY);
      }}
    >
      <div className="w-full hover:bg-[#ffffff11] px-3">
        <ContextButton
          onClick={(x, y) => props.onContextMenu(props.node.id, x, y)}
        >
          <h1 className="text-blue-500 px-3 font-bold text-lg">
            {props.node.title}
          </h1>
        </ContextButton>
      </div>
      {props.addingChild && <div ref={anchorRef} className="mx-3 h-10 "></div>}
      {props.children.map((node, index) => {
        return (
          <div key={node.id} className="pl-4">
            {props.renderNode(node)}
          </div>
        );
      })}
    </ol>
  );
}
