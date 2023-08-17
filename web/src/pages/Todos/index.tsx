import Cookies from "js-cookie";
import { useContext } from "react";
import Button from "../../components/Button";
import { Context } from "../../contexts/Context";
import { UserActions } from "../../types/reducerActionType";

const Todos = () => {
  const { state, dispatch } = useContext(Context);

  const handleLogout = () => {
    Cookies.remove("token");

    dispatch({
      type: UserActions.setName,
      payload: {
        name: "",
      },
    });

    dispatch({
      type: UserActions.setToken,
      payload: {
        token: "",
      },
    });
  };

  return (
    <div>
      <h1>Todos - Olá {state.user.name}</h1>
      <p>{state.user.token}</p>
      <Button onClick={handleLogout}>Clique para sair</Button>
    </div>
  );
};

export default Todos;
