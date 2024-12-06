import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { todosSliceReducer } from "./todos.slice.ts";

export const store = configureStore({
  reducer: {
    todos: todosSliceReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
