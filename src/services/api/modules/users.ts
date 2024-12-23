import type { FindQuery, CreateAccountRequest, User } from "@/helpers/types";
import { api } from "../index";
import { pick } from "lodash";
import UserModel from "@/models/UserModel";

const updateQuery = (data: Partial<User>) => ({
  url: `/users/${data.id}`,
  method: "PATCH",
  body: pick(data, "firstName", "lastName"),
});

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation<void, CreateAccountRequest>({
      query: (body) => ({
        url: "/users/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfile: builder.mutation<void, Partial<User>>({
      query: updateQuery,
      invalidatesTags: ["User", "Users"],
    }),

    updateMyProfile: builder.mutation<void, Partial<User>>({
      query: updateQuery,
      invalidatesTags: ["CurrentUser"],
    }),

    getAllUsers: builder.query<
      { results: UserModel[]; total: number },
      FindQuery
    >({
      query: ({ limit, offset }: FindQuery) =>
        `/users?limit=${limit}&offset=${offset}`,
      providesTags: ["Users"],
      transformResponse: (response: { results: User[]; total: number }) => ({
        results: response.results.map((user) => new UserModel(user)),
        total: response.total,
      }),
    }),

    getUserById: builder.query<UserModel, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
      transformResponse: (response: User) => new UserModel(response),
    }),

    getProfile: builder.query<UserModel, void>({
      query: () => "/users/me",
      providesTags: ["CurrentUser"],
      transformResponse: (response: User) => new UserModel(response),
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
  useCreateAccountMutation,
  useUpdateProfileMutation,
  useUpdateMyProfileMutation,
  useDeleteUserMutation,

  useGetAllUsersQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useGetProfileQuery,
} = usersApi;
