import { collection, getDocs, query } from "firebase/firestore";
import { db } from ".";
import { IUser } from "../models/user";
import { refCUser } from "./ref";

export const getUsersFromFirebase = async (): Promise<IUser[]> => {
  const q = query(refCUser);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(e => e.data() as IUser)
};  
