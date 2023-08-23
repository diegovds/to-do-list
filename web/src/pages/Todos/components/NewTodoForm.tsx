import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import InputDiv from "./InputDiv";
import Label from "./Label";
import Select from "./Select";

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

  const { ref: contentRef } = register("content");
  const { ref: priorityRef } = register("priority");
  const { ref: statusRef } = register("status");

  const onSubmit = async (data: NewTodoFormData) => {
    newTodo(data);
    reset();
  };

  return (
    <Form
      className="mt-10 w-full md:w-full lg:w-full lg:flex-row min-h-min"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputDiv>
        <Label htmlFor="todo">Tarefa:</Label>
        <Input
          type="text"
          placeholder="Digite a tarefa"
          id="todo"
          {...register("content", { required: true })}
          ref={contentRef}
        />
      </InputDiv>
      <div className="flex flex-col w-full gap-4 lg:flex-row lg:flex-1">
        <InputDiv>
          <Label htmlFor="priority">Prioridade:</Label>
          <Select
            id="priority"
            defaultValue="defaul"
            {...register("priority", { required: true })}
            ref={priorityRef}
          >
            <option value="defaul" disabled hidden>
              Selecionar
            </option>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </Select>
        </InputDiv>
        <InputDiv>
          <Label htmlFor="status">Status:</Label>
          <Select
            id="status"
            defaultValue="defaul"
            {...register("status", { required: true })}
            ref={statusRef}
          >
            <option value="defaul" disabled hidden>
              Selecionar
            </option>
            <option value="todo">Não iniciada</option>
            <option value="progress">Em progresso</option>
            <option value="done">Finalizada</option>
          </Select>
        </InputDiv>
      </div>
      <Button className="w-full lg:w-fit" disabled={isSubmitting}>
        Adicionar tarefa
      </Button>
    </Form>
  );
};

export default NewTodoForm;
