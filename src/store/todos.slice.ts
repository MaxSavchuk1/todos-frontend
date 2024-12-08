import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodos } from "../api";
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

export const fetchTodos = createAsyncThunk<any, void>(
  "@@todos/fetchTodos",
  async () => {
    try {
      const response = await getTodos();
      return response;
    } catch (e) {
      console.error("error", e);
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, () => {})
      .addCase(fetchTodos.rejected, () => {})
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const {
  setShowModal,
  pushToIdsStack,
  removeFromIdsStack,
  clearTodosIdsStack,
} = todosSlice.actions;

export const todosSliceReducer = todosSlice.reducer;
