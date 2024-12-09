import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { todosSliceReducer } from "./todos.slice.ts";
import { authSliceReducer } from "./auth.slice.ts";

import { api } from "@/services/api.ts";

export const store = configureStore({
  reducer: {
    todos: todosSliceReducer,
    auth: authSliceReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
