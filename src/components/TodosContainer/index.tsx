import { useMemo, useRef } from "react";
import { groupBy } from "lodash";
import styles from "./styles.module.css";
import { STATUSES } from "@/constants";
import TodoCard from "../TodoCard";
import useTodos from "@/hooks/useTodos";
import { updateTodo } from "@/api";
import type { TodoStatus, Todo } from "@/helpers/types";

type GroupedTodos = Record<TodoStatus, Todo[] | undefined>;

export default function TodosContainer() {
  const { setShowModal, todos, fetchTodos } = useTodos();

  const draggedTodoId = useRef<string | null>(null);

  const groupedTodos = useMemo(() => {
    if (!todos) return {} as GroupedTodos;
    return groupBy(todos, (todo) => todo.status) as GroupedTodos;
  }, [todos]);

  const onDrop = async ({ currentTarget }: React.DragEvent<HTMLDivElement>) => {
    const [todoStatus, todoId] = draggedTodoId.current!.split("_");
    const targetColumn = currentTarget.id.replaceAll("_", " ");

    if (targetColumn && todoStatus !== targetColumn) {
      try {
        await updateTodo(todoId, { status: targetColumn as TodoStatus });
        fetchTodos();
      } catch (e) {
        console.error("error", e);
      }
    }
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragTodo = (id: string) => {
    draggedTodoId.current = id;
  };

  return (
    <div className="flex gap-3 h-full">
      {STATUSES.map((status) => (
        <div
          id={status.replace(" ", "_")}
          key={status}
          className={styles.todosColumn}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <h2 className="capitalize mx-auto">{status}</h2>

          {groupedTodos[status] && (
            <div className="flex flex-col gap-2">
              {groupedTodos[status].map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  handleDragTodo={handleDragTodo}
                />
              ))}
            </div>
          )}

          {status === "new" && (
            <button
              className={styles.addButton}
              onClick={() => setShowModal(true)}
            >
              +
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
