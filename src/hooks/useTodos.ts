import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import {
  setShowModal as setShowModalAction,
  pushToIdsStack as pushToIdsStackAction,
  removeFromIdsStack as removeFromIdsStackAction,
  clearTodosIdsStack as clearTodosIdsStackAction,
} from "@/store/todos.slice";
import useCustomSelector from "./useCustomSelector";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useLazyGetTodoByIdQuery,
  useLazyGetTodosQuery,
  useUpdateTodoMutation,
} from "@/services/api/modules/todos";

const useTodos = () => {
  const dispatch = useAppDispatch();
  const [fetchTodos] = useLazyGetTodosQuery();
  const { data: todos } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const showModal = useCustomSelector((state) => state.todos.showModal);
  const todosIdsStack = useCustomSelector((state) => state.todos.todosIdsStack);

  const setShowModal = useCallback(
    (v: boolean) => dispatch(setShowModalAction(v)),
    [dispatch]
  );

  const pushToIdsStack = useCallback(
    (v: number) => dispatch(pushToIdsStackAction(v)),
    [dispatch]
  );

  const removeFromIdsStack = useCallback(
    (v: number) => dispatch(removeFromIdsStackAction(v)),
    [dispatch]
  );

  const clearTodosIdsStack = useCallback(
    () => dispatch(clearTodosIdsStackAction()),
    [dispatch]
  );

  return {
    todos,
    showModal,
    todosIdsStack,

    setShowModal,
    pushToIdsStack,
    removeFromIdsStack,
    clearTodosIdsStack,

    fetchTodos,

    createTodo,
    updateTodo,
    deleteTodo,
    useLazyGetTodoByIdQuery,
  };
};

export default useTodos;
