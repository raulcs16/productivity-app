import { ExplorerType } from "@/src/core/explorer/explorer";
import DirectoryMenuContext from "./DirectoryMenuContext";
import {
  useExplorerController,
  useExplorerStore,
} from "./ExplorerContextProvider";
import ExplorerMenuContext from "./ExplorerMenuContext";
import FileMenuContext from "./FileMenuContext";
import FolderSvg from "../svg/FolderSvg";
import ExplorerDelegate from "./ExplorerDelegate";
import PopUp from "../cards/PopUp";
import Button from "../controls/Button";

interface ExplorerViewProps {}
export default function ExplorerView(props: ExplorerViewProps) {
  const store = useExplorerStore();
  const controller = useExplorerController();
  return (
    <>
      <PopUp
        visible={store.nodeToDelete !== null}
        onClickedAway={() => controller.cancelDelete()}
      >
        <div className="flex items-center flex-col gap-4">
          <p>Delete File ? </p>
          <div className="flex gap-4">
            <Button
              active={true}
              title="Cancel"
              onClick={() => controller.confirmDelete()}
            >
              <p className="w-[5ch]">Yes</p>
            </Button>
            <Button
              active={true}
              title="Cancel"
              onClick={() => controller.cancelDelete()}
            >
              <p className="w-[5ch]">No</p>
            </Button>
          </div>
        </div>
      </PopUp>
      {store.activeMenu?.type === ExplorerType.Item && (
        <FileMenuContext
          id={store.activeMenu.id}
          x={store.activeMenu.x}
          y={store.activeMenu.y}
          open={true}
          onDelete={(id) => {
            controller.setDeleteId(id);
            controller.closeMenu();
          }}
          onRename={(id) => {
            controller.setEditableId(id);
            controller.closeMenu();
          }}
          onClose={() => controller.closeMenu()}
        ></FileMenuContext>
      )}
      {store.activeMenu?.type === ExplorerType.Container && (
        <DirectoryMenuContext
          directoryId={store.activeMenu.id}
          x={store.activeMenu.x}
          y={store.activeMenu.y}
          open={true}
          onAddFile={(directoyId: number) => {
            controller.addNode(ExplorerType.Item, "new fille", directoyId);
            controller.closeMenu();
          }}
          onRename={(directoryId) => {
            controller.setEditableId(directoryId);
            controller.closeMenu();
          }}
          onClose={() => controller.closeMenu()}
        ></DirectoryMenuContext>
      )}
      {store.activeMenu?.type === "Explorer" && (
        <ExplorerMenuContext
          x={store.activeMenu.x}
          y={store.activeMenu.y}
          open={true}
          onClose={() => controller.closeMenu()}
          onAddWorkSpace={() => {
            controller.addNode(ExplorerType.Container, "new directory", 0);
            controller.closeMenu();
          }}
        ></ExplorerMenuContext>
      )}
      <div
        className="w-full h-full pb-5 overflow-auto"
        onContextMenu={(e) => {
          e.preventDefault();
          controller.openMenu("Explorer", 0, e.clientX, e.clientY);
        }}
      >
        <header className="w-full px-2 py-1 flex justify-between items-center">
          <h1 className="text-sm">{"Explorer"}</h1>
          <button
            onClick={() => {
              controller.addNode(ExplorerType.Container, "new directory", 0);
            }}
          >
            <FolderSvg></FolderSvg>
          </button>
        </header>
        {store.nodes.map((node, index) => (
          <ExplorerDelegate
            key={index}
            id={node.id}
            type={node.type}
            title={node.title}
            editable={store.currentEditableId === node.id}
            selected={store.currentSelectionId === node.id}
            onContextMenu={(id, x, y) =>
              controller.openMenu(node.type, id, x, y)
            }
            onSelected={(id) => controller.selectNode(id)}
            onRename={(id, title) => controller.rename(id, title)}
            onCancelEdit={(id) => controller.cancelEdit(id)}
          ></ExplorerDelegate>
        ))}
      </div>
    </>
  );
}
