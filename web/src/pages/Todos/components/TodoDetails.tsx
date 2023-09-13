import { MdDelete, MdEdit } from "react-icons/md";
import { cn } from "../../../libs/utils";
import { Todo } from "../../../types/Todos";

type TodoDetailsProps = {
  todo: Todo;
  deleteTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
};

const TodoDetails = ({
  todo,
  todo: { content, priority },
  deleteTodo,
  editTodo,
}: TodoDetailsProps) => {
  return (
    <div
      className={cn(
        `flex justify-between items-center gap-4 p-5 rounded-xl bg-darker ring-2`,
        priority === "high"
          ? `ring-red-500`
          : priority === "medium"
          ? `ring-yellow-400`
          : `ring-green-500`
      )}
    >
      <h1 className="line-clamp-6 tracking-wider">{content}</h1>
      <div className="flex gap-4">
        <button
          className="flex items-center justify-center rounded-lg text-gray-50 transition-all hover:text-gray-300 disabled:opacity-50"
          onClick={() => deleteTodo(todo)}
        >
          <MdDelete size={20} />
        </button>
        <button
          className="flex items-center justify-center rounded-lg text-gray-50 transition-all hover:text-gray-300 disabled:opacity-50"
          onClick={() => editTodo(todo)}
        >
          <MdEdit size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoDetails;
