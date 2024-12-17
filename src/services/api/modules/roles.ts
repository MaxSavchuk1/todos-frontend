import { UpdateRolesRequest } from "@/helpers/types";
import { api } from "../index";

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateRoles: builder.mutation<void, UpdateRolesRequest>({
      query: (body) => ({
        url: `/roles/update`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateRolesMutation } = rolesApi;
