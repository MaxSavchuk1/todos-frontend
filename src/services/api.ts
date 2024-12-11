import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isString, omit } from "lodash";
import notify from "@/services/notify";
import { AppState } from "@/store";
import { setTokens, clearTokens } from "@/store/auth.slice.ts";
import {
  LoginRequest,
  SignUpRequest,
  Todo,
  TokensResponse,
  UserProfile,
} from "@/helpers/types";
import { router } from "@/router";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  prepareHeaders: (headers, { getState, extra }) => {
    if ((extra as any)?.refreshToken) {
      headers.set("authorization", `Bearer ${(extra as any).refreshToken}`);
      return headers;
    }
    const token = (getState() as AppState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      const refreshToken = (api.getState() as AppState).auth.refreshToken;
      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-tokens",
            method: "POST",
          },
          { ...api, extra: { refreshToken } },
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setTokens(refreshResult.data as TokensResponse));
          result = await baseQuery(args, api, extraOptions);
        } else {
          notify("Session expired", "error");
          api.dispatch(clearTokens());
          router.navigate("/sign-in");
        }
      }
    } else {
      const { message } = result.error?.data as any;
      if (isString(message)) {
        // TODO
        notify(message, "error");
      }
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Todos", "User"],
  endpoints: (builder) => ({
    login: builder.mutation<TokensResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<UserProfile & { id: number }, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    signup: builder.mutation<void, SignUpRequest>({
      query: (body) => ({
        url: "/user/create",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<void, UserProfile & { id: number }>({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PATCH",
        body: omit(data, "id", "email"),
      }),
      invalidatesTags: ["User"],
    }),
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
  useLoginMutation,
  useSignupMutation,

  useLazyGetTodosQuery,
  useLazyGetTodoByIdQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,

  useGetProfileQuery,
  useUpdateProfileMutation,
} = api;
