import { Todo } from "@/helpers/types";
import { api } from "../index";

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "/todos/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<void, { id: number; data: Partial<Todo> }>({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useLazyGetTodosQuery,
  useLazyGetTodoByIdQuery,

  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApi;
