import { constants } from "buffer";
import { ExplorerNode, ExplorerType } from "./explorer";

export class ExplorerTree {
  private rootNodeId: number = 0;

  private rootContainers: Map<number, ExplorerNode>;
  //parentId->children
  private childNodes: Map<number, ExplorerNode[]>;
  private idSet: Set<Number>;
  constructor() {
    this.idSet = new Set<number>();
    this.rootContainers = new Map<number, ExplorerNode>();
    this.childNodes = new Map<number, ExplorerNode[]>();
  }
  private hasId(id: number) {
    return this.idSet.has(id);
  }
  public addRootContainer(title: string, id: number) {
    if (this.hasId(id)) return;
    this.idSet.add(id);
    const container: ExplorerNode = {
      id,
      title,
      parentId: this.rootNodeId,
      type: ExplorerType.Container,
      route: "./" + title,
    };
    this.rootContainers.set(id, container);
    this.childNodes.set(id, []);
  }
  public addChildItem(title: string, id: number, parentId: number) {
    //if id already exists
    if (this.hasId(id)) return;
    //if parent id dne
    if (!this.hasId(parentId)) return;
    this.idSet.add(id);
    this.childNodes.get(parentId)?.push({
      id,
      title,
      parentId,
      type: ExplorerType.Item,
      route: this.rootContainers.get(id)?.route + "/" + title,
    });
  }
  public getExploreNodes(): ExplorerNode[] {
    const result: ExplorerNode[] = [];
    this.rootContainers.forEach((container) => {
      result.push(container);
      result.push(...(this.childNodes.get(container.id) ?? []));
    });
    return result;
  }
}
