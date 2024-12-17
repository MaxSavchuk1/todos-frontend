import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isString } from "lodash";
import notify from "@/services/notify";
import { setTokens, clearTokens } from "@/store/auth.slice.ts";
import { router } from "@/router";
import type { TokensResponse } from "@/helpers/types";
import type { AppState } from "@/store";
import { ROUTES } from "@/constants";

const baseUrl = "http://localhost:4000/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState, extraOptions }) => {
    if ((extraOptions as any)?.refreshToken) {
      headers.set(
        "authorization",
        `Bearer ${(extraOptions as any).refreshToken}`
      );
      return headers;
    }
    const token = (getState() as AppState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      const refreshToken = (api.getState() as AppState).auth.refreshToken;
      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-tokens",
            method: "POST",
          },
          api,
          { refreshToken }
        );
        if (refreshResult.data) {
          api.dispatch(setTokens(refreshResult.data as TokensResponse));
          result = await baseQuery(args, api, extraOptions);
        } else {
          notify("Session expired", "error");
          api.dispatch(clearTokens());
          api.dispatch(api.util.resetApiState());
          router.navigate(ROUTES.SIGN_IN);
        }
      }
    } else {
      const { message } = result.error?.data as any;
      if (isString(message)) {
        // TODO
        notify(message, "error");
      }
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Todos", "CurrentUser", "User"],
  endpoints: () => ({}),
});
