import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import SectionHeader from "../../components/SectionHeader";
import { Context } from "../../contexts/Context";
import api from "../../libs/axios";
import { Todo, Todos as TodosType } from "../../types/Todos";
import { UserActions } from "../../types/reducerActionType";
import MyTodosContainer from "./components/MyTodosContainer";
import NewTodoForm, { NewTodoFormData } from "./components/NewTodoForm";

const Todos = () => {
  const { state, dispatch } = useContext(Context);
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState<Todo[]>();
  const [progressTodo, setProgressTodo] = useState<Todo[]>();
  const [doneTodo, setDoneTodo] = useState<Todo[]>();

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

  useEffect(() => {
    const todo = todos?.filter((todo) => todo.status === "todo");
    const progress = todos?.filter((todo) => todo.status === "progress");
    const done = todos?.filter((todo) => todo.status === "done");

    setTodo(todo);
    setProgressTodo(progress);
    setDoneTodo(done);
  }, [todos]);

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
        <h2 className="text-3xl my-8">Carregando...</h2>
      ) : todos && todos.length > 0 ? (
        <MyTodosContainer
          todo={todo}
          progressTodo={progressTodo}
          doneTodo={doneTodo}
          editTodo={handleEditTodo}
          deleteTodo={handleDeleteTodo}
        />
      ) : (
        <h2 className="text-3xl my-8">Nenhuma tarefa cadastrada</h2>
      )}
    </section>
  );
};

export default Todos;
