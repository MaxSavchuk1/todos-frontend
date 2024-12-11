import { parseToken } from "@/helpers";
import { TokensResponse } from "@/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  loggedUserId: number | null;
};

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loggedUserId: parseToken(localStorage.getItem("accessToken") || "")?.sub,
};

const authSlice = createSlice({
  name: "@@auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokensResponse>) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      localStorage.setItem("accessToken", action.payload.access_token);
      localStorage.setItem("refreshToken", action.payload.refresh_token);
      state.loggedUserId = parseToken(action.payload.access_token).sub;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.loggedUserId = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
