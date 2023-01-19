import { IUser } from "../../../models/user";

export interface IState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: IUser;
}

export interface IPayload {
  user: IUser,
  isLoading?: boolean,
  isAuth: boolean;
}
