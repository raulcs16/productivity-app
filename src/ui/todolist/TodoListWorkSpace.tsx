"use client";
import { useState } from "react";
import HoverCard from "@/src/ui/shared/cards/HoverCard";
import TodoListView from "./TodoListView";
import SlideOver from "../shared/views/SlideOver";
import Grid from "../shared/views/Grid";
import {
  useTodoAppController,
  useTodoAppStore,
} from "@/src/apps/TodoApp/TodoAppContext";
import { LayoutType } from "@/src/apps/TodoApp/TodoListApp";
import DotNavigation from "../shared/controls/DotNavigation";
interface TodoListWorkSpaceProps {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

export default function TodoListWorkSpace(props: TodoListWorkSpaceProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();

  const [addNewListActive, setAddNewListActive] = useState(false);
  const totalLists = store.todolists.length;

  function scrollToBoard(index: number) {
    controller.setCurrentListIndex(index);
    if (props.layout !== LayoutType.Slide) props.setLayout(LayoutType.Slide);
  }

  function handlePrev() {
    if (totalLists == 0) return;
    const nextIndex =
      store.currentListIndex === 0
        ? totalLists - 1
        : store.currentListIndex - 1;
    scrollToBoard(nextIndex);
  }

  function handleNext() {
    if (totalLists == 0) return;
    const nextIndex =
      store.currentListIndex === totalLists - 1
        ? 0
        : store.currentListIndex + 1;
    scrollToBoard(nextIndex);
  }

  return (
    <div className="relative text-white  flex flex-col justify-start w-full h-full overflow-clip">
      {props.layout === LayoutType.Slide ? (
        <SlideOver
          items={store.todolists}
          currentIndex={store.currentListIndex}
          onIntentIndexChanged={(index) => {
            scrollToBoard(index);
          }}
          renderItem={(todolist, index, isFocused) => (
            <HoverCard
              index={index}
              className="h-[95%] md:ring-1 md:ring-amber-200 md:rounded-2xl"
              onClicked={(index) => {
                scrollToBoard(index);
              }}
            >
              <TodoListView id={todolist.id} title={todolist.title} />
            </HoverCard>
          )}
        ></SlideOver>
      ) : (
        <Grid
          items={store.todolists}
          currentIndex={store.currentListIndex}
          onItemClicked={(index) => {
            scrollToBoard(index);
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
      )}
      {props.layout === LayoutType.Slide && (
        <div className="absolute w-1/2 border flex items-center justify-center px-10 py-1 mx-auto bottom-1 left-1/2 -translate-x-1/2">
          <DotNavigation
            total={totalLists}
            currentIndex={store.currentListIndex}
            onIndexSelect={(index) => scrollToBoard(index)}
          ></DotNavigation>
        </div>
      )}
    </div>
  );
}
