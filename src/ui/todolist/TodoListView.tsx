"use client";
import { Todo, todo_state } from "@/src/core/todolist/todo";
import TodoDelegate from "./TodoDelegate";
import TextInput from "../controls/TextInput";

interface TodoListViewProps {
  onItemDoubleClicked: (
    todoId: number,
    todoState: todo_state,
    listId: number
  ) => void;
  id: number;
  title: string;
  todos: Todo[];
  onTodoAdded: (task: string) => void;
}

interface TodoListSectionProps {
  id: number;
  title: string;
  textColor: string;
  todos: Todo[];
  onItemDoubleClicked: (
    todoId: number,
    todoState: todo_state,
    listId: number
  ) => void;
  isFocused?: boolean; // New prop to spotlight "Started"
}

export default function TodoListView(props: TodoListViewProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-1">
      <header className="mb-6 pb-4 space-y-3 border-b border-slate-700/40 shrink-0 px-3 py-2">
        <h1 className="font-extrabold text-3xl text-slate-100 tracking-tight">
          {props.title}
        </h1>
        <TextInput
          onChange={(text) => {}}
          onEnter={(text) => {
            props.onTodoAdded(text);
          }}
          placeHolder="Add Todo's"
        />
      </header>
      <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-4 pb-2">
        <TodoListSection
          id={props.id}
          title="⚡ To Do"
          textColor="#3b82f6"
          todos={props.todos.filter((todo) => todo.state === todo_state.Ready)}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />

        <TodoListSection
          id={props.id}
          title="🔥 In Progress / Started"
          textColor="#f59e0b"
          isFocused={true} // Triggers special emphasis styling
          todos={props.todos.filter(
            (todo) => todo.state === todo_state.Started
          )}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />

        <TodoListSection
          id={props.id}
          title="📅 Scheduled"
          textColor="#64748b"
          todos={props.todos.filter(
            (todo) => todo.state === todo_state.Scheduled
          )}
          onItemDoubleClicked={props.onItemDoubleClicked}
        />

        {/* HISTORICAL / FOOTER SECTIONS:
            Moved inside the scrollable view region so they stay properly styled 
            at the bottom of the content track without forcing layout-breaking issues.
        */}
        <div className="mt-8 pt-6 border-t border-slate-700/40 space-y-4">
          <TodoListSection
            id={props.id}
            title="✅ Completed"
            textColor="#10b981"
            todos={props.todos.filter(
              (todo) => todo.state === todo_state.Completed
            )}
            onItemDoubleClicked={props.onItemDoubleClicked}
          />
          <TodoListSection
            id={props.id}
            title="📦 Archived"
            textColor="#94a3b8"
            todos={props.todos.filter(
              (todo) => todo.state === todo_state.Archived
            )}
            onItemDoubleClicked={props.onItemDoubleClicked}
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
        p-5 rounded-2xl border transition-all duration-200
        ${
          props.isFocused
            ? "bg-slate-800 border-amber-500/30 shadow-md ring-1 ring-amber-500/20" // Focused visual tweaks for dark theme consistency
            : "bg-slate-900/40 border-slate-700/40 shadow-sm"
        }
      `}
    >
      <h2
        className="font-bold text-lg flex items-center justify-between mb-3 border-b"
        style={{ color: props.textColor }}
      >
        <span>{props.title}</span>
        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-full">
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
              onDoubleClicked={(todoId, state) =>
                props.onItemDoubleClicked(todoId, state, props.id)
              }
            />
          ))}
        </ol>
      )}
    </section>
  );
}
