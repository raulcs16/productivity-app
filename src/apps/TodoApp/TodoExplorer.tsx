import ExplorerMenuContext from "@/src/ui/explorer/ExplorerMenuContext";
import { useTodoAppController, useTodoAppStore } from "./TodoAppContext";
import DirectoryMenuContext from "@/src/ui/explorer/DirectoryMenuContext";
import FileMenuContext from "@/src/ui/explorer/FileMenuContext";
import PopUp from "@/src/ui/shared/cards/PopUp";
import Button from "@/src/ui/shared/controls/Button";
import { useRef, useState } from "react";
import { ExplorerType } from "@/src/core/explorer/explorer";
import ExplorerView from "@/src/ui/explorer/ExplorerView";
import ExplorerRowDelegate from "./ExplorerRowDelegate";
import FolderSvg from "@/src/ui/shared/svg/FolderSvg";
import TextInput from "@/src/ui/shared/controls/TextInput";
import Scrim from "@/src/ui/shared/controls/Scrim";
import FloatingPortal from "@/src/ui/shared/cards/FloatingPortal";
import ExplorerContainer from "@/src/ui/explorer/ExplorerContainer";

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
  const [showInput, setShowInput] = useState<boolean>(true);
  const [activeDirectoryId, setActiveDirectoryId] = useState<number>(-1);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);

  function handleInput(text: string) {
    if (activeDirectoryId !== -1) {
      controller.addList(text, activeDirectoryId);
      setActiveDirectoryId(-1);
    } else {
      controller.addWorkSpace(text);
    }
    setShowInput(false);
  }
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
                if (deleteId) {
                }
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
            {
            }
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
            setActiveDirectoryId(directoyId);
            setShowInput(true);
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
            setShowInput(true);
            setActiveMenu(null);
          }}
        ></ExplorerMenuContext>
      )}
      <div
        className="w-full h-full pb-5 overflow-auto flex flex-col"
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
              setShowInput(true);
            }}
          >
            <FolderSvg width={25} heigth={25}></FolderSvg>
          </button>
        </header>
        <div className="w-full h-fit max-h-[90%] overflow-auto mb-2">
          <ExplorerView
            explorerNodes={store.explorerNodes}
            renderNode={(node) => (
              <ExplorerContainer
                key={node.id}
                node={node}
                children={store.childNodes.get(node.id) ?? []}
                onContextMenu={(id, x, y) => {
                  setActiveMenu({ type: "Container", id, x, y });
                }}
                addingChild={activeDirectoryId === node.id}
                registerAnchorRef={(el) => {
                  if (activeDirectoryId === node.id) {
                    bottomAnchorRef.current = el;
                  }
                }}
                renderNode={(node) => (
                  <ExplorerRowDelegate
                    key={node.id}
                    node={node}
                    onContextMenu={(id, x, y) => {
                      const type =
                        node.type === ExplorerType.Container
                          ? "Container"
                          : "Item";
                      setActiveMenu({ type, id, x, y });
                    }}
                  ></ExplorerRowDelegate>
                )}
              ></ExplorerContainer>
            )}
          ></ExplorerView>
        </div>
        {showInput && activeDirectoryId === -1 && (
          <div ref={bottomAnchorRef} className="mx-3 h-10"></div>
        )}
      </div>
      {showInput && (
        <>
          <Scrim onClickedAway={() => setShowInput(false)} z={20}></Scrim>
          <FloatingPortal anchorRef={bottomAnchorRef} z={30}>
            <div className="px-2 pt-0.5">
              <TextInput
                placeHolder="New Directory"
                onEnter={(text: string) => handleInput(text)}
                onChange={(text: string) => {}}
              ></TextInput>
            </div>
          </FloatingPortal>
        </>
      )}
    </>
  );
}
