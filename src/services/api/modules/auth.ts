import { LoginRequest, TokensResponse, User } from "@/helpers/types";
import { api } from "../index";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokensResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
