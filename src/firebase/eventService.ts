import { collection, getDocs, query } from "firebase/firestore";
import { db } from ".";
import { IUser } from "../models/user";
import { refCEvent, refCUser } from "./ref";
import { IEvent } from "../models/event";

export const getEventsFromFirebase = async (): Promise<IEvent[]> => {
  const q = query(refCEvent);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((e) => e.data() as IEvent);
};
