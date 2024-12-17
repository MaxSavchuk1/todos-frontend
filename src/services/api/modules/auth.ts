import {
  LoginRequest,
  TokensResponse,
  // User,
  ChangePasswordRequest,
} from "@/helpers/types";
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
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (body) => ({
        url: "/auth/password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
