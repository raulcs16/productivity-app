import { ExplorerNode } from "@/src/core/explorer/explorer";
import { useTodoAppController, useTodoAppStore } from "./TodoAppContext";
import ExplorerRow from "@/src/ui/explorer/ExplorerRow";

interface ExplorerRowDelegateProps {
  node: ExplorerNode;
  onContextMenu: (nodeId: number, x: number, y: number) => void;
}
export default function ExplorerRowDelegate(props: ExplorerRowDelegateProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();
  const nodeId = props.node.id;
  return (
    <ExplorerRow
      title={props.node.title}
      type={props.node.type}
      editable={nodeId === store.editableId}
      selected={nodeId === store.selectedId}
      onContextMenu={(x, y) => {
        props.onContextMenu(nodeId, x, y);
      }}
      onSelected={() => {}}
      onRename={(text) => controller.rename(nodeId, text)}
      onCancelEdit={() => controller.setEditId(-1)}
    ></ExplorerRow>
  );
}
