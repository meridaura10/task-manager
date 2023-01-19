import { collection, doc } from "firebase/firestore";
import { db } from ".";

export const refUser = (userId: string) =>{
    return doc(db, "users", userId);
}
export const refEvent = (eventId: string) => {
    return doc(db, "events", eventId);
}
export const refCEvent = collection(db, "events")
export const refCUser = collection(db, "users")