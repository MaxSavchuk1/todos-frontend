import { SignUpRequest, User } from "@/helpers/types";
import { api } from "../index";
import { omit } from "lodash";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<void, SignUpRequest>({
      query: (body) => ({
        url: "/user/create",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<void, User>({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PATCH",
        body: omit(data, "id", "email"),
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useSignupMutation, useUpdateProfileMutation } = usersApi;
