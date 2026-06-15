export enum ExplorerType {
  Container = "CONTAINER",
  Item = "ITEM",
}

export type ExplorerNode = {
  id: number;
  parentId: number;
  type: ExplorerType;
  title: string;
  route?: string;
};
