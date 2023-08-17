import Cookies from "js-cookie";
import decode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Context } from "./contexts/Context";
import Router from "./router";
import { UserActions } from "./types/reducerActionType";
import { User } from "./types/user";

const App = () => {
  const [cookieVerification, setCookieVerification] = useState(false);
  const { dispatch } = useContext(Context);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const user: User = decode(token);

      dispatch({
        type: UserActions.setName,
        payload: {
          name: user.name,
        },
      });

      dispatch({
        type: UserActions.setToken,
        payload: {
          token,
        },
      });
    }

    setCookieVerification(true);
  }, [dispatch]);

  if (!cookieVerification) {
    return <div />;
  }

  return <Router />;
};

export default App;
