import { doc, setDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../firebase";
import { refUser } from "../../../../firebase/ref";
import { IUser } from "../../../../models/user";

export const setUserToFirebase = createAsyncThunk<IUser | null, IUser>(
  "users/setUserToFirebase",
  async (user) => {
    try {
      await setDoc(refUser(user.id), {
        login: user.login,
        email: user.email,
        id: user.id,
      });
      return user
    } catch (error) {
      return null
    }
  }
);