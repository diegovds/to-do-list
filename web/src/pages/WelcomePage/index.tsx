import { Link } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import Button from "../../components/Button";

const WelcomePage = () => {
  return (
    <section className="container flex flex-col-reverse items-center justify-center p-10 gap-10 sm:flex-row">
      <div className="flex-1 text-center flex flex-col items-center gap-10">
        <h1 className="text-2xl tracking-wider font-bold">
          <Balancer>Bem-vindo ao My To-Do List</Balancer>
        </h1>
        <p className="text-sm tracking-wider text-gray-300">
          <Balancer>
            Adicione, gerencie e acompanhe suas tarefas divididas por níveis de
            prioridade e de progresso
          </Balancer>
        </p>
        <Link to="/signin" className="w-full sm:w-1/2">
          <Button className="w-full">Acessar</Button>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <img className="w-96 h-auto rounded-full" src="/note.png" alt="" />
      </div>
    </section>
  );
};

export default WelcomePage;
