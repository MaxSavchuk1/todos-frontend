import React, { memo, useMemo } from "react";
import clsx from "clsx";
import useTodos from "@/hooks/useTodos.ts";
import styles from "./style.module.css";
import type { Todo } from "@/helpers/types";

type Props = {
  todo: Todo;
  minified?: boolean;
  handleDragTodo?: (id: string) => void;
  handleClick?: () => void;
};

function TodoCard({
  todo,
  minified = false,
  handleDragTodo,
  handleClick,
}: Props) {
  const { setShowModal, pushToIdsStack } = useTodos();

  const createdTime = useMemo(
    () => new Date(todo.createdAt).toLocaleString(),
    [todo]
  );

  const clickHandler = () => {
    pushToIdsStack(todo.id);
    setShowModal(true);
  };

  const onDragStart = ({ target }: React.DragEvent<HTMLDivElement>) => {
    const { id } = target as HTMLElement;
    handleDragTodo!(id);
  };

  return (
    <div
      id={todo.status + "_" + todo.id}
      className={clsx(styles.cardContainer, !minified && "flex-col")}
      onClick={handleClick || clickHandler}
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

export default memo(TodoCard);
