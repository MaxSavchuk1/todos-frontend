import { useMemo } from "react";
import { STATUSES } from "../constants";
import TodoCard from "./TodoCard";
import useTodos from "../hooks/useTodos";

export default function TodosContainer({ todos }) {
  const groupedTodos = useMemo(() => {
    return Object.groupBy(todos, (todo) => todo.status);
  }, [todos]);
  const { setShowModal } = useTodos();

  return (
    <div className="flex gap-3 h-full">
      {STATUSES.map((status) => (
        <div
          key={status}
          className="flex flex-col w-64 shrink-0 h-full border border-black p-1 gap-2"
        >
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
              className="flex flex-col items-center justify-center gap-4 h-16 w-full border border-black rounded-md cursor-pointer bg-slate-100 text-xl"
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
