import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { RootState } from "../store"
import { userActions } from "../store/slice/userAuth/user.slice"
import { eventActions } from "../store/slice/event/event.slice"
import { setUserToFirebase } from "../store/slice/AsyncThunk/users/users"
import { createEvent, getEvents, getQuestsFromFirebase } from "../store/slice/AsyncThunk/event/event"

const actions = {
    ...userActions,
    ...eventActions,
    setUserToFirebase,
    getQuestsFromFirebase,
    getEvents,
    createEvent,
}
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector

export const useActions = () =>{
    const dispatch = useDispatch()
    return bindActionCreators(actions,dispatch)
}