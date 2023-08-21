import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import Input from "../../../components/Input";

const formSchema = z
  .object({
    content: z
      .string()
      .min(5, { message: "Content deve ter no mínimo 5 caracteres" })
      .max(300, { message: "Content deve ter no máximo 300 caracteres" }),
    priority: z.string(),
    status: z.string(),
  })
  .refine(
    (data) =>
      data.priority === "high" ||
      data.priority === "medium" ||
      data.priority === "low",
    {
      message: "Priority deve ser high, medium, ou low.",
    }
  )
  .refine(
    (data) =>
      data.status === "todo" ||
      data.status === "progress" ||
      data.status === "done",
    {
      message: "Status deve ser todo, progress ou done.",
    }
  );

export type NewTodoFormData = z.infer<typeof formSchema>;

type NewTodoFormProps = {
  newTodo: (data: NewTodoFormData) => void;
};

const NewTodoForm = ({ newTodo }: NewTodoFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTodoFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: NewTodoFormData) => {
    newTodo(data);
    reset();
  };

  return (
    <Form
      className="mt-7 mx-auto md:w-full lg:w-full min-h-fit lg:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 w-full lg:flex-1 lg:items-center lg:flex-row">
        <label htmlFor="todo">Tarefa:</label>
        <Input
          type="text"
          placeholder="Digite a tarefa"
          id="todo"
          {...register("content", { required: true })}
        />
      </div>
      <div className="flex w-full gap-4 flex-wrap lg:flex-nowrap lg:flex-1">
        <div className="flex flex-col gap-2 w-full lg:w-[50%] lg:items-center lg:flex-row">
          <label htmlFor="priority">Prioridade:</label>
          <select
            className="flex-1 focus: h-14 w-full rounded-lg bg-darker p-4 text-gray-50 outline-none ring-darker placeholder:text-gray-400 focus:ring-2"
            id="priority"
            {...register("priority", { required: true })}
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-[50%] lg:items-center lg:flex-row">
          <label htmlFor="status">Status:</label>
          <select
            className="flex-1 focus: h-14 w-full rounded-lg bg-darker p-4 text-gray-50 outline-none ring-darker placeholder:text-gray-400 focus:ring-2"
            id="status"
            {...register("status", { required: true })}
          >
            <option value="todo">Não iniciada</option>
            <option value="progress">Em progresso</option>
            <option value="done">Finalizada</option>
          </select>
        </div>
      </div>
      <Button className="py-4 w-full lg:w-fit" disabled={isSubmitting}>
        Adicionar tarefa
      </Button>
    </Form>
  );
};

export default NewTodoForm;
