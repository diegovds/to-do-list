import { cn } from "../../../libs/utils";
import { Todo } from "../../../types/Todos";

type TodoDetailsProps = {
  todo: Todo;
  deleteTodo: (id: string) => void;
};

const TodoDetails = ({
  todo: { id, content, priority },
  deleteTodo,
}: TodoDetailsProps) => {
  return (
    <div
      className={cn(
        `flex justify-between p-5 rounded-xl`,
        priority === "high"
          ? `bg-red-500`
          : priority === "medium"
          ? `bg-yellow-400`
          : `bg-green-500`
      )}
    >
      <h1>{content}</h1>
      <button className="bg-black rounded" onClick={() => deleteTodo(id)}>
        Deletar
      </button>
    </div>
  );
};

export default TodoDetails;
