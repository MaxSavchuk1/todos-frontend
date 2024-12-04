import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setShowModal as setShowModalAction,
  fetchTodos as fetchTodosAction,
  pushToIdsStack as pushToIdsStackAction,
  removeFromIdsStack as removeFromIdsStackAction,
  clearTodosIdsStack as clearTodosIdsStackAction,
} from "../store/todos.slice";
import useCustomSelector from "./useCustomSelector";

const useTodos = () => {
  const dispatch = useDispatch();

  const showModal = useCustomSelector((state) => state.todos.showModal);
  const todos = useCustomSelector((state) => state.todos.todos);
  const todosIdsStack = useCustomSelector((state) => state.todos.todosIdsStack);

  const setShowModal = useCallback(
    (v) => dispatch(setShowModalAction(v)),
    [dispatch]
  );

  const pushToIdsStack = useCallback(
    (v) => dispatch(pushToIdsStackAction(v)),
    [dispatch]
  );

  const removeFromIdsStack = useCallback(
    (v) => dispatch(removeFromIdsStackAction(v)),
    [dispatch]
  );

  const clearTodosIdsStack = useCallback(
    () => dispatch(clearTodosIdsStackAction()),
    [dispatch]
  );

  const fetchTodos = useCallback(
    () => dispatch(fetchTodosAction()),
    [dispatch]
  );

  return {
    showModal,
    todos,
    todosIdsStack,

    setShowModal,
    fetchTodos,
    pushToIdsStack,
    removeFromIdsStack,
    clearTodosIdsStack,
  };
};

export default useTodos;
