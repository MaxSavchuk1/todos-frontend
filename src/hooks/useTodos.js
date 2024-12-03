import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setShowModal as setShowModalAction,
  setSelectedTodo as setSelectedTodoAction,
} from "../store/todos.slice";
import useCustomSelector from "./useCustomSelector";

const useSettings = () => {
  const dispatch = useDispatch();
  const { showModal, selectedTodo } = useCustomSelector((state) => state.todos);

  const setShowModal = useCallback(
    (v) => dispatch(setShowModalAction(v)),
    [dispatch]
  );

  const setSelectedTodo = useCallback(
    (v) => dispatch(setSelectedTodoAction(v)),
    [dispatch]
  );

  return { showModal, selectedTodo, setShowModal, setSelectedTodo };
};

export default useSettings;
