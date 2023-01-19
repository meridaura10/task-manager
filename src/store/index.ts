import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slice/userAuth/user.slice'
import { eventReducer } from './slice/event/event.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
