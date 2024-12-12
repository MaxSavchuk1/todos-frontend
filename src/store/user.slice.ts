import { User } from "@/helpers/types";
import { authApi } from "@/services/api/modules/auth";
import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
