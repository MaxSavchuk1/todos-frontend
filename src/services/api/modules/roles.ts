import { UpdateRolesRequest } from "@/helpers/types";
import { api } from "../index";

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addRole: builder.mutation<void, UpdateRolesRequest>({
      query: (body) => ({
        url: `/role/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    removeRole: builder.mutation<void, UpdateRolesRequest>({
      query: (body) => ({
        url: `/role/remove`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useAddRoleMutation, useRemoveRoleMutation } = rolesApi;
