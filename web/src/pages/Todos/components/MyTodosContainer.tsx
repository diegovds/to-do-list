import { Todo } from "../../../types/Todos";
import TodoDetails from "./TodoDetails";
import TodosContainer from "./TodosContainer";

type MyTodosContainerProps = {
  todo: Todo[] | undefined;
  progressTodo: Todo[] | undefined;
  doneTodo: Todo[] | undefined;
  deleteTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
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
      <h2 className="my-8 text-xl font-bold tracking-wider">
        Tarefas adicionadas:
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10 items-start">
        <TodosContainer title="Não iniciada" todoLength={todo?.length}>
          {todo &&
            todo.map((todo, index) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                transition={{ delay: index * 0.35 }}
              />
            ))}
        </TodosContainer>
        <TodosContainer title="Em progresso" todoLength={progressTodo?.length}>
          {progressTodo &&
            progressTodo.map((todo, index) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                transition={{ delay: index * 0.35 }}
              />
            ))}
        </TodosContainer>
        <TodosContainer title="Finalizada" todoLength={doneTodo?.length}>
          {doneTodo &&
            doneTodo.map((todo, index) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                transition={{ delay: index * 0.35 }}
              />
            ))}
        </TodosContainer>
      </div>
    </>
  );
};

export default MyTodosContainer;
