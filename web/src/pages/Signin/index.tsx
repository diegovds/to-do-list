import { FormEvent } from "react";
import Button from "../../components/Button";

import Form from "../../components/Form";
import FormHeader from "../../components/Form/FormHeader";
import Input from "../../components/Input";
import Link from "../../components/Link";

const Signin = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex min-h-screen justify-center items-center">
      <Form onSubmit={handleSubmit}>
        <FormHeader title="Entrar" description="Insira as suas credenciais" />
        <Input type="email" placeholder="E-mail" />
        <Input type="password" placeholder="Senha" />
        <Button className="w-full my-3">Login</Button>
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
