import { useMemo, useRef } from "react";
import useTodos from "../hooks/useTodos";
// import Draggable from "react-draggable";

export default function TodoCard({ todo }) {
  const createdTime = useMemo(
    () => new Date(todo.createdAt).toLocaleString(),
    [todo]
  );
  const { setSelectedTodo, setShowModal } = useTodos();
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
    <div
      ref={nodeRef}
      className="flex flex-col items-center justify-center gap-4 h-40 w-full border border-black rounded-md cursor-pointer bg-slate-300"
      onClick={clickHandler}
    >
      <h2 className="text-xl line-clamp-2 px-2">{todo.title}</h2>
      <div>
        <span className="text-xs font-bold">Created at:&nbsp;</span>
        <span className="text-xs">{createdTime}</span>
      </div>
    </div>
  );
}
