import { reducerActionType, UserActions } from "../types/reducerActionType";

export type UserType = {
  name: string;
  token: string;
};

export const userInitialState: UserType = {
  name: "",
  token: "",
};

export const userReducer = (state: UserType, action: reducerActionType) => {
  switch (action.type) {
    case UserActions.setName:
      return { ...state, name: action.payload.name };

    case UserActions.setToken:
      return { ...state, token: action.payload.token };

    default:
      return state;
  }
};
