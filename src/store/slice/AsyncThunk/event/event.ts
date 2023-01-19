import { doc, setDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../firebase";
import { refEvent, refUser } from "../../../../firebase/ref";
import { IUser } from "../../../../models/user";
import { getUsersFromFirebase } from "../../../../firebase/UserService";
import { IEvent } from "../../../../models/event";
import { getEventsFromFirebase } from "../../../../firebase/eventService";

export const getQuestsFromFirebase = createAsyncThunk<IUser[]>(
  "events/getQuestsFromFirebase",
  async () => {
    return await getUsersFromFirebase()
  }
);



export const getEvents = createAsyncThunk<IEvent[],{userName: string}>(
  "events/getEvents",
  async ({userName}) => {    
    const events =  await getEventsFromFirebase()
    return events.filter(ev => ev.author === userName || ev.quest === userName)
  }
);

export const createEvent = createAsyncThunk<IEvent | null,IEvent>(
  "events/createEvent",
  async (event) => {
    try {
      await setDoc(refEvent(event.id), event)
      return event
    } catch (error) {
      console.log(error);   
      return null
    }
  }
);
