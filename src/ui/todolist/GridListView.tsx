import { TodoList } from "@/src/core/todolist/todo";
import HoverCard from "../shared/cards/HoverCard";
import Grid from "../shared/views/Grid";
import TodoListView from "./TodoListView";

interface GridListViewProps {
  todolists: TodoList[];
  currentIndex: number;
  onCurrentIndexChanged: (index: number) => void;
}
export default function GridListView(props: GridListViewProps) {
  return (
    <div>
      <Grid
        items={props.todolists}
        currentIndex={props.currentIndex}
        onItemClicked={(index) => {
          props.onCurrentIndexChanged(index);
        }}
        renderItem={(todolist, index, isFocused) => (
          <HoverCard
            index={index}
            className="h-full ring-1 ring-amber-300 rounded-2xl"
          >
            <TodoListView
              id={todolist.id}
              title={todolist.title}
            ></TodoListView>
          </HoverCard>
        )}
      ></Grid>
    </div>
  );
}
