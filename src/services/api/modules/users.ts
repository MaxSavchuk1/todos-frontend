import { FindQuery, SignUpRequest, User } from "@/helpers/types";
import { api } from "../index";
import { pick } from "lodash";

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
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query<{ results: User[]; total: number }, FindQuery>({
      query: ({ limit, offset }: FindQuery) =>
        `/users?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const {
  useSignupMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = usersApi;
