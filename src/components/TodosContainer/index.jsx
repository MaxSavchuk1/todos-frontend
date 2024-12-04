import { useMemo, useRef } from "react";
import styles from "./styles.module.css";
import { STATUSES } from "../../constants";
import TodoCard from "../TodoCard";
import useTodos from "../../hooks/useTodos";
import { updateTodo } from "../../api";

export default function TodosContainer() {
  const { setShowModal, todos, fetchTodos } = useTodos();

  const draggedTodoId = useRef(null);

  const groupedTodos = useMemo(() => {
    if (!todos) return [];
    return Object.groupBy(todos, (todo) => todo.status);
  }, [todos]);

  const onDrop = async (e) => {
    const [todoStatus, todoId] = draggedTodoId.current.split("_");
    const targetColumn = e.currentTarget.id.replaceAll("_", " ");

    if (targetColumn && todoStatus !== targetColumn) {
      try {
        await updateTodo(todoId, { status: targetColumn });
        fetchTodos();
      } catch (e) {
        console.error("error", e);
      }
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragTodo = (id) => {
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
