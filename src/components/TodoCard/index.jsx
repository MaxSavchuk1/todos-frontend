import { useMemo } from "react";
import clsx from "clsx";
import useTodos from "../../hooks/useTodos";
import styles from "./style.module.css";

export default function TodoCard({ todo, minified = false, handleDragTodo }) {
  const { setShowModal, pushToIdsStack } = useTodos();

  const createdTime = useMemo(
    () => new Date(todo.createdAt).toLocaleString(),
    [todo]
  );

  const clickHandler = () => {
    pushToIdsStack(todo.id);
    setShowModal(true);
  };

  const onDragStart = (e) => {
    handleDragTodo(e.target.id);
  };

  return (
    <div
      id={todo.status + "_" + todo.id}
      className={clsx(styles.cardContainer, !minified && "flex-col")}
      onClick={clickHandler}
      draggable={!minified}
      onDragStart={onDragStart}
    >
      <h2 className={clsx(minified ? "text-sm" : "text-lg", "line-clamp-1")}>
        {todo.title}
      </h2>

      {minified ? (
        <p className={styles.status}>{todo.status}</p>
      ) : (
        <div className={styles.createdAt}>
          <span className="text-xs font-bold">Created at:&nbsp;</span>
          <span className="text-xs">{createdTime}</span>
        </div>
      )}
    </div>
  );
}
