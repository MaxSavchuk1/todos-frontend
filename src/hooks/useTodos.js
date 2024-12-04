import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setShowModal as setShowModalAction,
  // setSelectedTodoId as setSelectedTodoIdAction,
  fetchTodos as fetchTodosAction,
  pushToIdsStack as pushToIdsStackAction,
  removeFromIdsStack as removeFromIdsStackAction,
  clearTodosIdsStack as clearTodosIdsStackAction,
} from "../store/todos.slice";
import useCustomSelector from "./useCustomSelector";

const useTodos = () => {
  const dispatch = useDispatch();

  const showModal = useCustomSelector((state) => state.todos.showModal);
  // const selectedTodoId = useCustomSelector(
  //   (state) => state.todos.selectedTodoId
  // );
  const todos = useCustomSelector((state) => state.todos.todos);
  const todosIdsStack = useCustomSelector((state) => state.todos.todosIdsStack);

  const setShowModal = useCallback(
    (v) => dispatch(setShowModalAction(v)),
    [dispatch]
  );

  // const setSelectedTodoId = useCallback(
  //   (v) => dispatch(setSelectedTodoIdAction(v)),
  //   [dispatch]
  // );

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
    // selectedTodoId,
    todos,
    todosIdsStack,

    setShowModal,
    // setSelectedTodoId,
    fetchTodos,
    pushToIdsStack,
    removeFromIdsStack,
    clearTodosIdsStack,
  };
};

export default useTodos;
