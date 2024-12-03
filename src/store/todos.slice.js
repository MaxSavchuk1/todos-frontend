import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  selectedTodo: null,
};

const todosSlice = createSlice({
  name: "@@todos",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const { setShowModal, setSelectedTodo } = todosSlice.actions;
export const todosSliceReducer = todosSlice.reducer;
