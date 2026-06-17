"use client";
import { Todo, TodoState } from "@/src/core/todolist/todo";
import TodoDelegate from "./TodoDelegate";
import TextInput from "../shared/controls/TextInput";

import {
  useTodoAppController,
  useTodoAppStore,
} from "@/src/apps/TodoApp/TodoAppContext";

interface TodoListViewProps {
  id: number;
  title: string;
}

interface TodoListSectionProps {
  id: number;
  title: string;
  textColor: string;
  todos: Todo[];
  onItemDoubleClicked: (todoId: number) => void;
  isFocused?: boolean; // New prop to spotlight "Started"
}

export default function TodoListView(props: TodoListViewProps) {
  const store = useTodoAppStore();
  const controller = useTodoAppController();
  const todos = store.todos.filter((todo) => todo.listId == props.id);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-2">
      <header className="mb-6 pb-4 space-y-3 border-b shrink-0  py-2 w-full">
        <h1 className="font-extrabold text-xl text-slate-100 tracking-tight">
          {props.title}
        </h1>
        <TextInput
          onChange={(text) => {}}
          onEnter={(text) => {
            controller.addTodo(text, props.id);
          }}
          placeHolder="Add Todo"
        />
      </header>
      <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-4 pb-2">
        <TodoListSection
          id={props.id}
          title="To Do"
          textColor="#3b82f6"
          todos={todos.filter((todo) => todo.state === TodoState.Ready)}
          onItemDoubleClicked={(todoId) => {
            controller.updateTodoState(todoId);
          }}
        />

        <TodoListSection
          id={props.id}
          title="In Progress"
          textColor="#f59e0b"
          isFocused={true} // Triggers special emphasis styling
          todos={todos.filter((todo) => todo.state === TodoState.Started)}
          onItemDoubleClicked={(todoId) => {
            controller.updateTodoState(todoId);
          }}
        />
        <TodoListSection
          id={props.id}
          title="Completed"
          textColor="#10b981"
          todos={todos.filter((todo) => todo.state === TodoState.Completed)}
          onItemDoubleClicked={(todoId) => {
            controller.updateTodoState(todoId);
          }}
        />

        <div className="mt-8 pt-6 border-t border-slate-700/40 space-y-4">
          <TodoListSection
            id={props.id}
            title="Scheduled"
            textColor="#64748b"
            todos={todos.filter((todo) => todo.state === TodoState.Scheduled)}
            onItemDoubleClicked={(todoId) => {
              // controller.updateTodoState(todoId);
            }}
          />
          <TodoListSection
            id={props.id}
            title="Archived"
            textColor="#94a3b8"
            todos={todos.filter((todo) => todo.state === TodoState.Archived)}
            onItemDoubleClicked={(todoId) => {
              // controller.updateTodoState(todoId);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function TodoListSection(props: TodoListSectionProps) {
  return (
    <section
      className={`
        w-full p-2 rounded-2xl transition-all duration-200
        ${
          props.isFocused
            ? " shadow-md" // Focused visual tweaks for dark theme consistency
            : " shadow-sm"
        }
      `}
    >
      <h2
        className="font-bold text-lg flex items-center justify-between mb-3 border-b"
        style={{ color: props.textColor }}
      >
        <span>{props.title}</span>
        <span className="text-xs font-semibold px-2 py-0.5 text-slate-400 border border-slate-700 rounded-full">
          {props.todos.length}
        </span>
      </h2>

      {props.todos.length === 0 ? (
        <p className="text-sm text-slate-500 italic py-2 text-center">
          No tasks here
        </p>
      ) : (
        <ol className="space-y-1.5 h-auto max-h-[210px] overflow-y-auto pr-1 normal-scrollbar">
          {props.todos.map((todo) => (
            <TodoDelegate
              key={todo.id}
              id={todo.id}
              task={todo.task}
              state={todo.state}
              onDoubleClicked={(todoId) => props.onItemDoubleClicked(todoId)}
            />
          ))}
        </ol>
      )}
    </section>
  );
}
