import { TodoList } from "@/src/core/todolist/todo";
import SlideOver from "../shared/views/SlideOver";
import { useState } from "react";
import HoverCard from "../shared/cards/HoverCard";
import TodoListView from "./TodoListView";
import DotNavigation from "../shared/controls/DotNavigation";

interface SlideListViewProps {
  todolists: TodoList[];
  currentIndex: number;
  onCurrentIndexChanged: (index: number) => void;
}
export default function SlideListView(props: SlideListViewProps) {
  return (
    <div>
      <SlideOver
        items={props.todolists}
        currentIndex={props.currentIndex}
        onIntentIndexChanged={(index) => {
          props.onCurrentIndexChanged(index);
        }}
        renderItem={(todolist, index, isFocused) => (
          <HoverCard
            index={index}
            className="h-[95%] md:ring-1 md:ring-amber-200 md:rounded-2xl"
            onClicked={(index) => {
              props.onCurrentIndexChanged(index);
            }}
          >
            <TodoListView id={todolist.id} title={todolist.title} />
          </HoverCard>
        )}
      ></SlideOver>
      <div className="absolute w-1/2 flex items-center justify-center px-10 py-1 mx-auto bottom-1 left-1/2 -translate-x-1/2">
        <DotNavigation
          total={props.todolists.length}
          currentIndex={props.currentIndex}
          onIndexSelect={(index) => props.onCurrentIndexChanged(index)}
        ></DotNavigation>
      </div>
    </div>
  );
}
