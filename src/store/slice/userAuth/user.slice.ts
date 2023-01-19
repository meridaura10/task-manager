import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/user";
import { IPayload, IState } from "./types";
import { setUserToFirebase } from "../AsyncThunk/users/users";

const initialState: IState = {
  isAuth: false,
  isLoading: false,
  error: "",
  user: {} as IUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, actions: PayloadAction<IPayload>) {
      state.user = actions.payload.user;
      state.error = "";
      state.isLoading = actions.payload.isLoading || false;
      state.isAuth = actions.payload.isAuth;
    },
    changeLoadingUser(state, actions: PayloadAction<boolean>) {
      state.isLoading = actions.payload;
    },
    changeErrorUser(state, actions: PayloadAction<string>) {
      state.error = actions.payload;
    },
    removeUser(state) {
      state.user = {
        login: "",
        email: "",
        id: "",
      };
      state.isAuth = false;
      state.error = "";
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setUserToFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.isAuth = false;
      })
      .addCase(setUserToFirebase.fulfilled, (state, actions) => {
        if (actions.payload) {
          state.user = actions.payload;
          state.error = "";
          state.isLoading = false;
          state.isAuth = true;
        } else {
          state.error = "an error occurred while creating the user";
        }
      });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
