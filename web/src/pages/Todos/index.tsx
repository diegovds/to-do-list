import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useContext } from "react";
import Button from "../../components/Button";
import SectionHeader from "../../components/SectionHeader";
import { Context } from "../../contexts/Context";
import api from "../../libs/axios";
import { Todos as TodosType } from "../../types/Todos";
import { UserActions } from "../../types/reducerActionType";
import NewTodoForm, { NewTodoFormData } from "./components/NewTodoForm";
import TodoDetails from "./components/TodoDetails";

const Todos = () => {
  const { state, dispatch } = useContext(Context);
  const queryClient = useQueryClient();

  const getTodos = async () => {
    return await api
      .get<TodosType>("/todos", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((response) => response.data.todos);
  };

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

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
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      })
      .catch(() => {
        alert("Ocorreu um erro ao adicionar a tarefa");
      });
  };

  const handleDeleteTodo = async (id: string) => {
    await api
      .delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      })
      .catch(() => {
        alert("Ocorreu um erro ao deletar a tarefa");
      });
  };

  const handleEditTodo = async (id: string) => {
    const index = todos?.map((todo) => todo.id).indexOf(id);

    console.log(index);
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
      {isLoading ? (
        <p>Carregando...</p>
      ) : todos && todos.length > 0 ? (
        <div className="grid grid-cols-3 gap-10 my-5">
          <div className="bg-card shadow-card rounded-lg p-5">
            <h3 className="mb-5 text-center">Não iniciada</h3>
            <div className="flex flex-col gap-3">
              {todos?.map(
                (todo) =>
                  todo.status === "todo" && (
                    <TodoDetails
                      key={todo.id}
                      todo={todo}
                      deleteTodo={handleDeleteTodo}
                      editTodo={handleEditTodo}
                    />
                  )
              )}
            </div>
          </div>
          <div className="bg-card shadow-card rounded-lg p-5">
            <h3 className="mb-5 text-center">Em progresso</h3>
            <div className="flex flex-col gap-3">
              {todos?.map(
                (todo) =>
                  todo.status === "progress" && (
                    <TodoDetails
                      key={todo.id}
                      todo={todo}
                      deleteTodo={handleDeleteTodo}
                      editTodo={handleEditTodo}
                    />
                  )
              )}
            </div>
          </div>
          <div className="bg-card shadow-card rounded-lg p-5">
            <h3 className="mb-5 text-center">Finalizada</h3>
            <div className="flex flex-col gap-3">
              {todos?.map(
                (todo) =>
                  todo.status === "done" && (
                    <TodoDetails
                      key={todo.id}
                      todo={todo}
                      deleteTodo={handleDeleteTodo}
                      editTodo={handleEditTodo}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Nenhuma tarefa cadastrada</p>
      )}
    </section>
  );
};

export default Todos;
