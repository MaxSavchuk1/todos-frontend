import { useMemo } from "react";
import styles from "./styles.module.css";
import { STATUSES } from "../../constants";
import TodoCard from "../TodoCard";
import useTodos from "../../hooks/useTodos";

export default function TodosContainer({ todos }) {
  const { setShowModal } = useTodos();

  const groupedTodos = useMemo(() => {
    return Object.groupBy(todos, (todo) => todo.status);
  }, [todos]);

  return (
    <div className="flex gap-3 h-full">
      {STATUSES.map((status) => (
        <div key={status} className={styles.todosColumn}>
          <h2 className="capitalize mx-auto">{status}</h2>

          {groupedTodos[status] && (
            <div className="flex flex-col gap-2">
              {groupedTodos[status].map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
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
