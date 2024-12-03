import { useMemo, useRef } from "react";
import useTodos from "../../hooks/useTodos";
import styles from "./style.module.css";
// import Draggable from "react-draggable";

export default function TodoCard({ todo }) {
  const { setSelectedTodo, setShowModal } = useTodos();

  const createdTime = useMemo(
    () => new Date(todo.createdAt).toLocaleString(),
    [todo]
  );

  const nodeRef = useRef(null);

  const clickHandler = () => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  // const eventLogger = (e, data) => {
  //   console.log("Event: ", e);
  //   console.log("Data: ", data);
  // };

  return (
    // <Draggable nodeRef={nodeRef} onMouseDown={eventLogger} onStop={eventLogger}>
    <div ref={nodeRef} className={styles.cardContainer} onClick={clickHandler}>
      <h2 className="text-lg line-clamp-2">{todo.title}</h2>
      <div>
        <span className="text-xs font-bold">Created at:&nbsp;</span>
        <span className="text-xs">{createdTime}</span>
      </div>
    </div>
  );
}
