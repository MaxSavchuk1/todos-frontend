import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "@/store";
import { setTokens, clearTokens } from "@/store/auth.slice.ts";
import {
  LoginRequest,
  SignUpRequest,
  Todo,
  TokensResponse,
} from "@/helpers/types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
        body: { refreshToken: (api.getState() as AppState).auth.refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(setTokens(refreshResult.data as TokensResponse));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearTokens());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<TokensResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<void, SignUpRequest>({
      query: (userData) => ({
        url: "/user/create",
        method: "POST",
        body: userData,
      }),
    }),
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetTodosQuery } = api;
