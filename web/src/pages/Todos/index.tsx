import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, useInView } from "framer-motion";
import Cookies from "js-cookie";
import { useContext, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { TbLogout } from "react-icons/tb";
import Button from "../../components/Button";
import SectionHeader from "../../components/SectionHeader";
import { Context } from "../../contexts/Context";
import api from "../../libs/axios";
import { Todo, Todos as TodosType } from "../../types/Todos";
import { UserActions } from "../../types/reducerActionType";
import Modal from "./components/Modal";
import MyTodosContainer from "./components/MyTodosContainer";
import NewTodoForm, { NewTodoFormData } from "./components/NewTodoForm";

const Todos = () => {
  const { state, dispatch } = useContext(Context);
  const queryClient = useQueryClient();
  const [deletedTodo, setDeletedTodo] = useState<Todo | undefined>(undefined);
  const [editedTodo, setEditedTodo] = useState<Todo | undefined>(undefined);

  const refNewTodoForm = useRef<HTMLDivElement>(null);
  const isInView = useInView(refNewTodoForm, { once: false });

  const getTodos = async () => {
    return await api
      .get<TodosType>("/todos", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((response) => response.data);
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
    await toast
      .promise(
        api.post(
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
        ),
        {
          loading: "Processando solicitação",
          success: "Tarefa adicionada com sucesso 👌",
          error: "Ocorreu um erro ao adicionar a tarefa 🤯",
        }
      )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      })
      .catch(() => {});
  };

  const handleUpdateTodo = async ({
    content,
    priority,
    status,
  }: NewTodoFormData) => {
    await toast
      .promise(
        api.put(
          `/todos/${editedTodo?.id}`,
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
        ),
        {
          loading: "Processando solicitação",
          success: "Tarefa atualizada com sucesso 👌",
          error: "Ocorreu um erro ao atualizar a tarefa 🤯",
        }
      )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      })
      .catch(() => {})
      .finally(() => setEditedTodo(undefined));
  };

  const handleDeleteTodo = async (toDelete: boolean) => {
    if (deletedTodo && toDelete) {
      await toast
        .promise(
          api.delete(`/todos/${deletedTodo.id}`, {
            headers: {
              Authorization: `Bearer ${state.user.token}`,
            },
          }),
          {
            loading: "Processando solicitação",
            success: "Tarefa excluída com sucesso 👌",
            error: "Ocorreu um erro ao deletar a tarefa 🤯",
          }
        )
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        })
        .catch(() => {})
        .finally(() => setDeletedTodo(undefined));
    }
  };

  const handleModal = () => {
    setDeletedTodo(undefined);
  };

  const deleteTodo = (todo: Todo) => {
    setDeletedTodo(todo);
  };

  const editTodo = (todo: Todo) => {
    const formSection = document.querySelector("#form");
    if (formSection && !isInView) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }

    setEditedTodo(todo);
  };

  const editCancel = (todo: undefined) => {
    setEditedTodo(todo);
  };

  return (
    <section className="container">
      <div
        className="flex justify-between items-center py-5 mb-8 border-b border-b-gray-400"
        ref={refNewTodoForm}
      >
        <SectionHeader
          className="flex-1 items-start"
          title={`Olá, ${state.user.name}`}
          description="Aqui você pode adicionar e gerenciar as suas tarefas"
        />
        <Button className="rounded-full" onClick={handleLogout}>
          <TbLogout size={20} />
        </Button>
      </div>
      <NewTodoForm
        newTodo={handleNewTodo}
        editTodo={editedTodo}
        updateTodo={handleUpdateTodo}
        editCancel={editCancel}
      />
      {isLoading ? (
        <h2 className="text-xl my-8">Carregando...</h2>
      ) : todos &&
        (todos.todo.length > 0 ||
          todos.progress.length > 0 ||
          todos.done.length > 0) ? (
        <>
          <MyTodosContainer
            todo={todos.todo}
            progressTodo={todos.progress}
            doneTodo={todos.done}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {deletedTodo && (
              <Modal
                modalStatus={handleModal}
                handleDeleteTodo={handleDeleteTodo}
              >
                <h3 className="tracking-wider truncate">
                  Deseja excluir a tarefa{" "}
                  <span className="font-bold">"{deletedTodo.content}"</span>?
                </h3>
              </Modal>
            )}
          </AnimatePresence>
        </>
      ) : (
        <h2 className="text-xl my-8">Nenhuma tarefa cadastrada</h2>
      )}
    </section>
  );
};

export default Todos;
