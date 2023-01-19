import { createSlice } from "@reduxjs/toolkit";
import { EventState } from "./types";
import { createEvent, getEvents, getQuestsFromFirebase } from "../AsyncThunk/event/event";

const initialState: EventState = {
  quests: [],
  events: [],
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getQuestsFromFirebase.fulfilled, (state, actions) => {
        state.quests = actions.payload;
      })
      .addCase(createEvent.fulfilled, (state, actions) => {
        if (actions.payload) {
          state.events.push(actions.payload)
        }
      })
      .addCase(getEvents.fulfilled,(state,actions) =>{
        state.events = actions.payload        
      })
  },
});

export const eventActions = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
