import { configureStore } from "@reduxjs/toolkit";
import { todosSliceReducer } from "./todos.slice";

export const store = configureStore({
  reducer: {
    todos: todosSliceReducer,
  },
  devTools: true,
});
