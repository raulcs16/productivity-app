import ExplorerMenuContext from "@/src/ui/explorer/ExplorerMenuContext";
import { useTodoAppController, useTodoAppStore } from "./TodoAppContext";
import DirectoryMenuContext from "@/src/ui/explorer/DirectoryMenuContext";
import FileMenuContext from "@/src/ui/explorer/FileMenuContext";
import PopUp from "@/src/ui/shared/cards/PopUp";
import Button from "@/src/ui/shared/controls/Button";
import { useState } from "react";
import { ExplorerType } from "@/src/core/explorer/explorer";
import ExplorerView from "@/src/ui/explorer/ExplorerView";
import ExplorerRowDelegate from "./ExplorerRowDelegate";
import FolderSvg from "@/src/ui/shared/svg/FolderSvg";
import { title } from "process";

interface TodoExplorerProps {}
export default function TodoExplorer(props: TodoExplorerProps) {
  const controller = useTodoAppController();
  const store = useTodoAppStore();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<{
    type: "Explorer" | "Container" | "Item";
    id: number;
    x: number;
    y: number;
  } | null>(null);
  return (
    <>
      <PopUp visible={false} onClickedAway={() => {}}>
        <div className="flex items-center flex-col gap-4 ">
          <p>Delete File ? </p>
          <div className="flex gap-4">
            <Button
              active={true}
              title="Confirm"
              onClick={() => {
                if (deleteId) controller.deleteNode(deleteId);
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
            controller.deleteNode(id);
            setActiveMenu(null);
          }}
          onRename={(id) => {
            controller.setEditId(id);
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
            controller.addList("new file", directoyId);
            setActiveMenu(null);
          }}
          onRename={(directoryId) => {
            controller.setEditId(directoryId);
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
            controller.addNode(ExplorerType.Container, "new directory", 0);
            setActiveMenu(null);
          }}
        ></ExplorerMenuContext>
      )}
      <div
        className="w-full h-full pb-5 overflow-auto"
        onContextMenu={(e) => {
          e.preventDefault();
          setActiveMenu({
            type: "Explorer",
            id: 0,
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        <header className="w-full px-2 py-1 flex justify-between items-center">
          <h1 className="text-sm">{"Explorer"}</h1>
          <button
            onClick={() => {
              controller.addWorkSpace("new directory");
            }}
          >
            <FolderSvg></FolderSvg>
          </button>
        </header>
        <ExplorerView
          explorerNodes={store.explorerNodes}
          renderNode={(node) => (
            <ExplorerRowDelegate
              key={node.id}
              node={node}
              onContextMenu={(id, x, y) => {
                const type =
                  node.type === ExplorerType.Container ? "Container" : "Item";
                setActiveMenu({ type, id, x, y });
              }}
            ></ExplorerRowDelegate>
          )}
        ></ExplorerView>
      </div>
    </>
  );
}
