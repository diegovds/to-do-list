import Cookies from "js-cookie";
import { useContext } from "react";
import Button from "../../components/Button";
import SectionHeader from "../../components/SectionHeader";
import { Context } from "../../contexts/Context";
import api from "../../libs/axios";
import { UserActions } from "../../types/reducerActionType";
import NewTodoForm, { NewTodoFormData } from "./components/NewTodoForm";

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

  const handleNewTodo = async ({
    content,
    priority,
    status,
  }: NewTodoFormData) => {
    await api
      .post(
        "/todos",
        {
          content,
          priority,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      )
      .then(() => {
        alert("Tarefa adicionada");
      })
      .catch(() => {
        alert("Ocorreu um erro ao adicionar a tarefa");
      });
  };

  return (
    <section className="container">
      <div className="flex justify-between items-center pt-5">
        <SectionHeader
          className="flex-1 items-start"
          title={`Olá, ${state.user.name}`}
          description="Texto teste"
        />
        <Button onClick={handleLogout}>Sair</Button>
      </div>
      <div className="border-b mt-5 border-b-gray-100" />
      <NewTodoForm newTodo={handleNewTodo} />
    </section>
  );
};

export default Todos;
