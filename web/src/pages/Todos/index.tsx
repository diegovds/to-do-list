import { useContext } from "react";
import { Context } from "../../contexts/Context";

const Todos = () => {
  const { state } = useContext(Context);
  return (
    <div>
      <h1>Todos - Olá {state.user.name}</h1>
      <p>{state.user.token}</p>
    </div>
  );
};

export default Todos;
