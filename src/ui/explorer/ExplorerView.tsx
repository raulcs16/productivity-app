import { ExplorerNode, ExplorerType } from "@/src/core/explorer/explorer";

import FolderSvg from "../shared/svg/FolderSvg";

interface ExplorerViewProps {
  explorerNodes: ExplorerNode[];
  renderNode: (node: ExplorerNode) => React.ReactNode;
}

export default function ExplorerView(props: ExplorerViewProps) {
  return (
    <div className="w-full h-full">
      {props.explorerNodes
        .filter((node) => node.parentId === 0)
        .map((node, index) => {
          const children = props.explorerNodes.filter(
            (child) => child.parentId === node.id
          );
          return (
            <div key={node.id || index}>
              {props.renderNode(node)}
              {children.map((childNode, childIndex) => {
                return (
                  <div key={childNode.id} className="pl-4">
                    {props.renderNode(childNode)}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
