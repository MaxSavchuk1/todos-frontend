import { FindQuery, SignUpRequest, User } from "@/helpers/types";
import { api } from "../index";
import { pick } from "lodash";
import { AppState } from "@/store";
import { parseToken } from "@/helpers";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<void, SignUpRequest>({
      query: (body) => ({
        url: "/users/create",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<void, Partial<User>>({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PATCH",
        body: pick(data, "firstName", "lastName"),
      }),
      invalidatesTags: ["CurrentUser", "User", "Users"], // TODO:
    }),
    getAllUsers: builder.query<{ results: User[]; total: number }, FindQuery>({
      query: ({ limit, offset }: FindQuery) =>
        `/users?limit=${limit}&offset=${offset}`,
      providesTags: ["Users"],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getProfile: builder.query<User, void>({
      queryFn: async (_arg, queryApi, _extraOptions, baseQuery) => {
        try {
          const { accessToken } = (queryApi.getState() as AppState).auth;
          const { sub: id } = parseToken(accessToken);
          const result = await baseQuery(`/users/${id}`);
          if (result.error) {
            return { error: result.error };
          }
          return { data: result.data as User };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: String(error),
              data: null,
            } as FetchBaseQueryError,
          };
        }
      },
      providesTags: ["CurrentUser"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useSignupMutation,
  useUpdateProfileMutation,
  useDeleteUserMutation,

  useGetAllUsersQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useGetProfileQuery,
} = usersApi;
