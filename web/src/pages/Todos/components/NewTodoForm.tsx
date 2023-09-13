import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import { Todo } from "../../../types/Todos";
import InputDiv from "./InputDiv";
import Label from "./Label";
import Select from "./Select";

const formSchema = z
  .object({
    content: z
      .string()
      .min(5, { message: "A tarefa precisa ter no mínimo 5 caracteres" })
      .max(300, { message: "Máximo de caracteres atingidos." }),
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
      path: ["priority"],
    }
  )
  .refine(
    (data) =>
      data.status === "todo" ||
      data.status === "progress" ||
      data.status === "done",
    {
      message: "Status deve ser todo, progress ou done.",
      path: ["status"],
    }
  );

export type NewTodoFormData = z.infer<typeof formSchema>;

type NewTodoFormProps = {
  newTodo: (data: NewTodoFormData) => void;
  updateTodo: (data: NewTodoFormData) => void;
  editTodo: Todo | undefined;
  editCancel: (data: undefined) => void;
};

const NewTodoForm = ({
  newTodo,
  editTodo,
  editCancel,
  updateTodo,
}: NewTodoFormProps) => {
  const [modifiedForm, setModifiedForm] = useState(0);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm<NewTodoFormData>({
    resolver: zodResolver(formSchema),
  });

  const watchAllFields = watch();

  useEffect(() => {
    if (errors.priority) {
      setFocus("priority");
    }

    if (errors.status) {
      setFocus("status");
    }
  }, [errors, setFocus]);

  useEffect(() => {
    if (editTodo) {
      setValue("content", editTodo.content);
      setValue("priority", editTodo.priority);
      setValue("status", editTodo.status);
    } else {
      setValue("content", "");
      setValue("priority", "default");
      setValue("status", "default");
    }
  }, [setValue, editTodo]);

  useEffect(() => {
    if (editTodo) {
      let cont = 0;
      watchAllFields.content === editTodo.content ? cont++ : 0;
      watchAllFields.status === editTodo.status ? cont++ : 0;
      watchAllFields.priority === editTodo.priority ? cont++ : 0;

      setModifiedForm(cont);
    } else {
      setModifiedForm(0);
    }
  }, [editTodo, watchAllFields]);

  const { ref: contentRef } = register("content");
  const { ref: priorityRef } = register("priority");
  const { ref: statusRef } = register("status");

  const onSubmit = async (data: NewTodoFormData) => {
    !editTodo ? newTodo(data) : updateTodo(data);
    reset();
  };

  return (
    <Form
      className="w-full md:w-full lg:w-full lg:flex-row min-h-min"
      id="form"
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
            className={
              watchAllFields.priority === "high"
                ? `ring-2 ring-red-500`
                : watchAllFields.priority === "medium"
                ? `ring-2 ring-yellow-400`
                : watchAllFields.priority === "low"
                ? `ring-2 ring-green-500`
                : ``
            }
            defaultValue="default"
            {...register("priority", { required: true })}
            ref={priorityRef}
          >
            <option value="default" disabled hidden>
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
            defaultValue="default"
            {...register("status", { required: true })}
            ref={statusRef}
          >
            <option value="default" disabled hidden>
              Selecionar
            </option>
            <option value="todo">Não iniciada</option>
            <option value="progress">Em progresso</option>
            <option value="done">Finalizada</option>
          </Select>
        </InputDiv>
      </div>
      {editTodo && (
        <div
          className="w-full lg:w-fit flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-gray-50 transition-all hover:bg-blue-500 disabled:opacity-50"
          onClick={() => editCancel(undefined)}
        >
          Cancelar
        </div>
      )}
      <Button
        className="w-full lg:w-fit"
        disabled={isSubmitting || modifiedForm === 3 ? true : false}
      >
        {!editTodo ? "Adicionar tarefa" : "Atualizar tarefa"}
      </Button>
    </Form>
  );
};

export default NewTodoForm;
