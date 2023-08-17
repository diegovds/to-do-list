import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormHeader from "../../components/Form/FormHeader";
import Input from "../../components/Input";
import Link from "../../components/Link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

const Signin = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { ref: emailRef } = register("email");
  const { ref: passwordRef } = register("password");

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <section className="flex min-h-screen justify-center items-center">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader title="Entrar" description="Insira as suas credenciais" />
        <Input
          type="text"
          placeholder="E-mail"
          autoFocus
          {...register("email", { required: true })}
          ref={emailRef}
        />
        <Input
          type="password"
          placeholder="Senha"
          {...register("password", { required: true })}
          ref={passwordRef}
        />
        <Button className="w-full my-3" disabled={isSubmitting}>
          Login
        </Button>
        <div className="flex flex-col items-center xsm:flex-row gap-1">
          <p className="text-sm">Ainda não possui uma conta?</p>
          <Link className="underline text-sm" to={`/signup`}>
            Clique aqui
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default Signin;
