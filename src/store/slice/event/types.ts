import { IEvent } from "../../../models/event";
import { IUser } from "../../../models/user";

export interface EventState {
    quests: IUser[],
    events: IEvent[],   
}
export interface EventPayload {
    quests: IUser[],
    events: IEvent[],   
}