import { Todo } from "../../../types/Todos";
import TodoDetails from "./TodoDetails";
import TodosContainer from "./TodosContainer";

type MyTodosContainerProps = {
  todo: Todo[] | undefined;
  progressTodo: Todo[] | undefined;
  doneTodo: Todo[] | undefined;
  deleteTodo: (todo: Todo) => void;
  editTodo: (id: string) => void;
};

const MyTodosContainer = ({
  todo,
  progressTodo,
  doneTodo,
  editTodo,
  deleteTodo,
}: MyTodosContainerProps) => {
  return (
    <>
      <h2 className="text-3xl my-8">Tarefas adicionadas:</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-5 items-start">
        <TodosContainer title="Não iniciada" todoLength={todo?.length}>
          {todo &&
            todo.map((todo) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
        </TodosContainer>
        <TodosContainer title="Em progresso" todoLength={progressTodo?.length}>
          {progressTodo &&
            progressTodo.map((todo) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
        </TodosContainer>
        <TodosContainer title="Finalizada" todoLength={doneTodo?.length}>
          {doneTodo &&
            doneTodo.map((todo) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
        </TodosContainer>
      </div>
    </>
  );
};

export default MyTodosContainer;
