import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import decode from "jwt-decode";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Link from "../../components/Link";
import SectionHeader from "../../components/SectionHeader";
import { Context } from "../../contexts/Context";
import api from "../../libs/axios";
import { auth } from "../../types/auth";
import { UserActions } from "../../types/reducerActionType";
import { User } from "../../types/user";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

const Signin = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { ref: emailRef } = register("email");
  const { ref: passwordRef } = register("password");

  const onSubmit = async ({ email, password }: FormData) => {
    await api
      .post<auth>("/auth", {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        const cookieExpiresInSeconds = 60 * 60 * 24 * 30;

        Cookies.set("token", token, {
          expires: cookieExpiresInSeconds,
          path: "/",
        });

        const user: User = decode(token);

        dispatch({
          type: UserActions.setName,
          payload: {
            name: user.name,
          },
        });

        dispatch({
          type: UserActions.setToken,
          payload: {
            token,
          },
        });

        return navigate("/todos");
      })
      .catch(() => {});
  };

  return (
    <section className="container flex min-h-screen justify-center items-center py-10">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SectionHeader
          title="Entrar"
          description="Insira as suas credenciais"
        />
        <Input
          type="text"
          placeholder="E-mail"
          autoFocus
          disabled={isSubmitting}
          {...register("email", { required: true })}
          ref={emailRef}
        />
        <Input
          type="password"
          placeholder="Senha"
          disabled={isSubmitting}
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
