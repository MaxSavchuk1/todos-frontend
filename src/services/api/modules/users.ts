import type {
  FindQuery,
  CreateAccountRequest,
  User,
  Todo,
} from "@/helpers/types";
import { api } from "../index";
import { pick } from "lodash";

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

    getAllUsers: builder.query<{ results: User[]; total: number }, FindQuery>({
      query: ({ limit, offset }: FindQuery) =>
        `/users?limit=${limit}&offset=${offset}`,
      providesTags: ["Users"],
    }),

    getUserById: builder.query<User & { todos: Todo[] }, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

    getProfile: builder.query<User, void>({
      query: () => "/users/me",
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
  useCreateAccountMutation,
  useUpdateProfileMutation,
  useUpdateMyProfileMutation,
  useDeleteUserMutation,

  useGetAllUsersQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useGetProfileQuery,
} = usersApi;
