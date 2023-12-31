import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { cn } from "../../../libs/utils";
import { Todo } from "../../../types/Todos";

type TodoDetailsProps = ComponentProps<typeof motion.div> & {
  todo: Todo;
  deleteTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
};

const TodoDetails = ({
  todo,
  todo: { content, priority },
  deleteTodo,
  editTodo,
  ...props
}: TodoDetailsProps) => {
  return (
    <motion.div
      className={cn(
        `flex justify-between items-center gap-4 p-5 rounded-xl bg-darker ring-2`,
        priority === "high"
          ? `ring-red-500`
          : priority === "medium"
          ? `ring-yellow-400`
          : `ring-green-500`
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      {...props}
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
    </motion.div>
  );
};

export default TodoDetails;
