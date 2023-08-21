import { MdDelete, MdEdit } from "react-icons/md";
import { cn } from "../../../libs/utils";
import { Todo } from "../../../types/Todos";

type TodoDetailsProps = {
  todo: Todo;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
};

const TodoDetails = ({
  todo: { id, content, priority },
  deleteTodo,
  editTodo
}: TodoDetailsProps) => {
  return (
    <div
      className={cn(
        `flex justify-between items-center gap-4 p-5 rounded-xl bg-darker border-2`,
        priority === "high"
          ? `border-red-500`
          : priority === "medium"
          ? `border-yellow-400`
          : `border-green-500`
      )}
    >
      <h1 className="line-clamp-6">{content}</h1>
      <div className="flex gap-4">
        <button
          className="flex items-center justify-center rounded-lg text-gray-50 transition-all hover:text-gray-300 disabled:opacity-50"
          onClick={() => deleteTodo(id)}
        >
          <MdDelete size={23} />
        </button>
        <button
          className="flex items-center justify-center rounded-lg text-gray-50 transition-all hover:text-gray-300 disabled:opacity-50"
          onClick={() => editTodo(id)}
        >
          <MdEdit size={23} />
        </button>
      </div>
    </div>
  );
};

export default TodoDetails;
