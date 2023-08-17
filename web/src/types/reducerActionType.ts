export enum UserActions {
    setName,
    setToken
}

export type reducerActionType = {
    type: UserActions;
    payload: {
      [key: string]: any;
    };
};
  