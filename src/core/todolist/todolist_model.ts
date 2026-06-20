import { Todo, TodoList, TodoState, TodoWorkSpace } from "./todo";

export class TodoListModel {
  private todos: Todo[] = [];
  private lists: TodoList[] = [];
  private workspaces: TodoWorkSpace[] = [];
  private currentWorkSpaceId: number = 0;
  private currentListId: number = 0;
  constructor() {}

  //updates
  public addTodo(task: string) {
    if (this.currentWorkSpaceId === 0) return;
    if (this.currentListId === 0) return;
    this.todos.push({
      id: Date.now(),
      task,
      state: TodoState.Ready,
      listId: this.currentListId,
    });
  }
  public addNewList(title: string, workSpaceId: number): number {
    if (!this.workspaces.find((item) => item.id === workSpaceId)) return -1;
    const id = Date.now();
    this.lists.push({
      id,
      title,
      workSpaceId,
    });
    this.currentWorkSpaceId = workSpaceId;
    this.currentListId = id;
    return id;
  }
  public addWorkSpace(title: string): number {
    const id = Date.now();
    this.workspaces.push({
      id,
      title,
    });
    this.currentWorkSpaceId = id;
    this.currentListId = 0;
    return id;
  }
  //setters
  public setWorkSpace(id: number): boolean {
    const index = this.workspaces.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.currentWorkSpaceId = id;
    return true;
  }
  public setTodoList(id: number): boolean {
    const list = this.lists.find((item) => item.id === id);
    if (!list) return false;
    if (!this.setWorkSpace(list.workSpaceId)) return false;
    this.currentListId = list.id;
    return true;
  }
  //getters
  public getCurrentTodosByState(state: TodoState): Todo[] {
    let result: Todo[] = this.todos.filter(
      (item) => item.listId === this.currentListId && item.state === state
    );
    return result;
  }
  public getWorkSpaces(): TodoWorkSpace[] {
    return this.workspaces;
  }
  public getCurrentTodoLists(): TodoList[] {
    return this.lists.filter(
      (item) => item.workSpaceId === this.currentWorkSpaceId
    );
  }
  public getCurrentWorkSpace(): TodoWorkSpace {
    let workspace = this.workspaces.find(
      (item) => item.id === this.currentWorkSpaceId
    );
    if (!workspace) {
      return { id: -1, title: "Root" };
    }
    return workspace;
  }
  public getCurrentListIndex(): number {
    return this.lists.findIndex((item) => item.id === this.currentListId);
  }
}
