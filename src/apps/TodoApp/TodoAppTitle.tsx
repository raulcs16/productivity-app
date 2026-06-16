import { useTodoAppStore } from "./TodoAppContext";

interface TodoAppTitleProps {}
export default function TodoAppTitle(props: TodoAppTitleProps) {
  const { workspaceTitle } = useTodoAppStore();
  return (
    <h1 className="font-extrabold text-xl tracking-tight">{workspaceTitle}</h1>
  );
}
