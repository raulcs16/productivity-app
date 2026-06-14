"use client";
import React, { useRef, useState, useEffect } from "react";
import { Todo, TodoList } from "@/src/core/todolist/todo";
import HoverCard from "../cards/HoverCard";
import TodoListView from "./TodoListView";
import NextPrevButtons from "../controls/NextPrevButtons";
import SlideOver from "../views/SlideOver";
import Grid from "../views/Grid";
import GridToggle from "../controls/GridToggle";
import Button from "../controls/Button";

interface TodoListWorkSpaceProps {
  id: number;
  title: string;
  lists: TodoList[];
  onTodoAdded: (listId: number, task: string) => void;
  onNewList: () => void;
  onCurrentListIdChanged: (listId: number) => void;
  selectedFileId: number;
}

export default function TodoListWorkSpace(props: TodoListWorkSpaceProps) {
  const [layout, setLayout] = useState(0); //0 for slide, 1 for grid select
  const [currentIndex, setCurrentIndex] = useState(() => {
    const index = props.lists.findIndex(
      (list) => list.id === props.selectedFileId
    );
    return index !== -1 ? index : 0;
  });
  const [addNewListActive, setAddNewListActive] = useState(false);
  const totalLists = props.lists.length;
  useEffect(() => {
    const index = props.lists.findIndex(
      (list) => list.id === props.selectedFileId
    );
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [props.selectedFileId, props.lists]);
  function scrollToBoard(index: number) {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    if (layout !== 0) setLayout(0);
    props.onCurrentListIdChanged(props.lists[index].id);
  }

  function handlePrev() {
    if (totalLists == 0) return;
    const nextIndex = currentIndex === 0 ? totalLists - 1 : currentIndex - 1;
    scrollToBoard(nextIndex);
  }

  function handleNext() {
    if (totalLists == 0) return;
    const nextIndex = currentIndex === totalLists - 1 ? 0 : currentIndex + 1;
    scrollToBoard(nextIndex);
  }
  function handleToggle(state: boolean) {
    if (!state) {
      console.log(state);
      if (layout === 1) return;
      setLayout(1);
    }
    if (state) {
      if (layout === 0) return;
      setLayout(0);
    }
  }

  return (
    <div className=" text-white  flex flex-col justify-start w-full h-full overflow-clip">
      <header className="w-full px-8 py-2 mb-4 flex flex-col md:flex-row items-center justify-between shrink-0 gap-4">
        <h1 className="font-extrabold text-2xl tracking-tight">
          {props.title}
        </h1>

        <div className="w-full flex items-center  justify-between md:justify-end gap-4">
          <GridToggle
            active={layout === 1}
            onToggled={(state) => {
              handleToggle(state);
            }}
          ></GridToggle>
          <div className="w-fit flex gap-4">
            <NextPrevButtons
              total={totalLists}
              currentIndex={currentIndex}
              onNext={() => handleNext()}
              onPrev={() => handlePrev()}
            ></NextPrevButtons>
            <Button
              title="New List"
              onClick={() => {
                props.onNewList();
                setAddNewListActive(false);
                setCurrentIndex(totalLists);
              }}
              active={addNewListActive}
            >
              New List
            </Button>
          </div>
        </div>
      </header>
      {layout === 0 ? (
        <SlideOver
          items={props.lists}
          currentIndex={currentIndex}
          onIntentIndexChanged={(index) => {
            scrollToBoard(index);
          }}
          renderItem={(todolist, index, isFocused) => (
            <HoverCard
              index={index}
              className="h-full"
              onClicked={(index) => {
                scrollToBoard(index);
              }}
            >
              <TodoListView
                id={todolist.id}
                title={todolist.title}
                todos={todolist.todos}
                onItemDoubleClicked={(id, state, lId) =>
                  console.log("Task click:", id)
                }
                onTodoAdded={(task: string) =>
                  props.onTodoAdded(todolist.id, task)
                }
              />
            </HoverCard>
          )}
        ></SlideOver>
      ) : (
        <Grid
          items={props.lists}
          currentIndex={currentIndex}
          onItemClicked={(index) => {
            scrollToBoard(index);
          }}
          renderItem={(todolist, index, isFocused) => (
            <HoverCard index={index} className="h-full p-6">
              <TodoListView
                id={todolist.id}
                title={todolist.title}
                todos={todolist.todos}
                onItemDoubleClicked={(id) => {
                  console.log("task click");
                }}
                onTodoAdded={(task: string) => {}}
              ></TodoListView>
            </HoverCard>
          )}
        ></Grid>
      )}
    </div>
  );
}
