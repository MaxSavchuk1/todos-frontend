import { createSlice } from "@reduxjs/toolkit";

export type TodosState = {
  showModal: boolean;
  todosIdsStack: number[];
};

const initialState: TodosState = {
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
  },
});

export const {
  setShowModal,
  pushToIdsStack,
  removeFromIdsStack,
  clearTodosIdsStack,
} = todosSlice.actions;

export const todosSliceReducer = todosSlice.reducer;
