import { createSlice } from "@reduxjs/toolkit";
import type { Todo } from "@/helpers/types";

export type TodosState = {
  todos: Todo[];
  showModal: boolean;
  todosIdsStack: number[];
};

const initialState: TodosState = {
  todos: [],
  showModal: false,
  todosIdsStack: [],
};

const todosSlice = createSlice({
  name: "@@todos",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    pushToIdsStack: (state, action) => {
      state.todosIdsStack = [...state.todosIdsStack, action.payload];
    },
    removeFromIdsStack: (state, action) => {
      const index = state.todosIdsStack.indexOf(action.payload);
      if (index > -1) {
        state.todosIdsStack = state.todosIdsStack.slice(0, index + 1);
      }
    },
    clearTodosIdsStack: (state) => {
      state.todosIdsStack = [];
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
});

export const {
  setShowModal,
  pushToIdsStack,
  removeFromIdsStack,
  clearTodosIdsStack,
  setTodos,
  clearTodos,
} = todosSlice.actions;

export const todosSliceReducer = todosSlice.reducer;
