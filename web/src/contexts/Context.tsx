import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useReducer } from "react";
import { Toaster } from "react-hot-toast";
import {
  UserType,
  userInitialState,
  userReducer,
} from "../reducers/userReducer";
import { reducerActionType } from "../types/reducerActionType";

type initialStateType = {
  user: UserType;
};

type ContextType = {
  state: initialStateType;
  dispatch: React.Dispatch<any>;
};

const initialState = {
  user: userInitialState,
};

export const Context = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state: initialStateType, action: reducerActionType) => ({
  user: userReducer(state.user, action),
});

export const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const queryClient = new QueryClient();

  return (
    <Context.Provider value={{ state, dispatch }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#000",
              color: "#f3f4f6",
            },
          }}
          position="bottom-center"
        />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </Context.Provider>
  );
};
