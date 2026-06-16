import { ExplorerNode, ExplorerType } from "@/src/core/explorer/explorer";
import DirectoryMenuContext from "./DirectoryMenuContext";

import ExplorerMenuContext from "./ExplorerMenuContext";
import FileMenuContext from "./FileMenuContext";
import FolderSvg from "../shared/svg/FolderSvg";
import ExplorerDelegate from "./ExplorerDelegate";
import PopUp from "../shared/cards/PopUp";
import Button from "../shared/controls/Button";
import { useState } from "react";

interface ExplorerViewProps {
  explorerNodes: ExplorerNode[];
  selectedId: number;
  editableId: number;

  onNodeSelected: (id: number) => void;
  onNodeRenamed: (id: number, title: string) => void;
  onNodeDelete: (id: number) => void;
  onNodeAdded: (type: ExplorerType, title: string, parentId: number) => void;
  onSetEditId: (id: number) => void;
}

function getNodeDepth(node: ExplorerNode, allNodes: ExplorerNode[]): number {
  if (!node.parentId || node.parentId === 0) return 0;
  const parent = allNodes.find((n) => n.id === node.parentId);
  if (!parent) return 0;
  return 1 + getNodeDepth(parent, allNodes);
}

export default function ExplorerView(props: ExplorerViewProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<{
    type: "Explorer" | "Container" | "Item";
    id: number;
    x: number;
    y: number;
  } | null>(null);
  return (
    <>
      <PopUp visible={!deleteId === null} onClickedAway={() => {}}>
        <div className="flex items-center flex-col gap-4">
          <p>Delete File ? </p>
          <div className="flex gap-4">
            <Button
              active={true}
              title="Confirm"
              onClick={() => {
                if (deleteId) props.onNodeDelete(deleteId);
              }}
            >
              <p className="w-[5ch]">Yes</p>
            </Button>
            <Button
              active={true}
              title="Cancel"
              onClick={() => {
                setDeleteId(null);
              }}
            >
              <p className="w-[5ch]">No</p>
            </Button>
          </div>
        </div>
      </PopUp>
      {activeMenu?.type === "Item" && (
        <FileMenuContext
          id={activeMenu.id}
          x={activeMenu.x}
          y={activeMenu.y}
          open={true}
          onDelete={(id) => {
            setDeleteId(id);
            setActiveMenu(null);
          }}
          onRename={(id) => {
            props.onSetEditId(id);
            setActiveMenu(null);
          }}
          onClose={() => setActiveMenu(null)}
        ></FileMenuContext>
      )}
      {activeMenu?.type === "Container" && (
        <DirectoryMenuContext
          directoryId={activeMenu.id}
          x={activeMenu.x}
          y={activeMenu.y}
          open={true}
          onAddFile={(directoyId: number) => {
            props.onNodeAdded(ExplorerType.Item, "newFile", directoyId);
            setActiveMenu(null);
          }}
          onRename={(directoryId) => {
            props.onSetEditId(directoryId);
            setActiveMenu(null);
          }}
          onClose={() => setActiveMenu(null)}
        ></DirectoryMenuContext>
      )}
      {activeMenu?.type === "Explorer" && (
        <ExplorerMenuContext
          x={activeMenu.x}
          y={activeMenu.y}
          open={true}
          onClose={() => setActiveMenu(null)}
          onAddWorkSpace={() => {
            props.onNodeAdded(ExplorerType.Container, "new directory", 0);
            setActiveMenu(null);
          }}
        ></ExplorerMenuContext>
      )}
      <div
        className="w-full h-full pb-5 overflow-auto"
        onContextMenu={(e) => {
          e.preventDefault();
          // controller.openMenu("Explorer", 0, e.clientX, e.clientY);
        }}
      >
        <header className="w-full px-2 py-1 flex justify-between items-center">
          <h1 className="text-sm">{"Explorer"}</h1>
          <button
            onClick={() => {
              props.onNodeAdded(ExplorerType.Container, "new directory", 0);
            }}
          >
            <FolderSvg></FolderSvg>
          </button>
        </header>
        {props.explorerNodes
          .filter((node) => node.parentId === 0)
          .map((node, index) => {
            const parentDepth = getNodeDepth(node, props.explorerNodes);
            const parentStyle = { paddingLeft: `${parentDepth * 16}px` };

            const children = props.explorerNodes.filter(
              (child) => child.parentId === node.id
            );

            return (
              <div key={node.id || index}>
                <ExplorerDelegate
                  id={node.id}
                  type={node.type}
                  title={node.title}
                  style={parentStyle}
                  editable={props.editableId === node.id}
                  selected={props.selectedId === node.id}
                  onContextMenu={(id, x, y) => {
                    const type =
                      node.type === ExplorerType.Container
                        ? "Container"
                        : "Item";
                    setActiveMenu({ type, id, x, y });
                  }}
                  onSelected={(id) => props.onNodeSelected(id)}
                  onRename={(id, title) => props.onNodeRenamed(id, title)}
                  onCancelEdit={() => props.onSetEditId(-1)} // 💡 Fix 5: Graceful exit
                />

                {/* NESTED CHILD NODES */}
                {children.map((childNode, childIndex) => {
                  // 💡 Fix 4: Calculate child node depth separately from the parent layout
                  const childDepth = getNodeDepth(
                    childNode,
                    props.explorerNodes
                  );
                  const childStyle = { paddingLeft: `${childDepth * 16}px` };

                  return (
                    <ExplorerDelegate
                      key={childNode.id || childIndex}
                      id={childNode.id}
                      type={childNode.type}
                      title={childNode.title}
                      style={childStyle}
                      editable={props.editableId === childNode.id}
                      selected={props.selectedId === childNode.id}
                      onContextMenu={(id, x, y) => {
                        const type =
                          childNode.type === ExplorerType.Container
                            ? "Container"
                            : "Item";
                        setActiveMenu({ type, id, x, y });
                      }}
                      onSelected={(id) => props.onNodeSelected(id)}
                      onRename={(id, title) => props.onNodeRenamed(id, title)}
                      onCancelEdit={() => props.onSetEditId(-1)}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
    </>
  );
}
