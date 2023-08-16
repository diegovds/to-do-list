import { FormEvent, useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";

const Home = () => {
  const [form, setForm] = useState<"signin" | "signup">("signin");

  const handleState = (state: "signin" | "signup") => {
    setForm(state);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-[200vh] justify-center items-center">
      {form === "signin" ? (
        <Form onSubmit={handleSubmit}>
          <h1>Signin</h1>
          <Button onClick={() => handleState("signup")}>Mudar form</Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <Button onClick={() => handleState("signin")}>Mudar form</Button>
        </Form>
      )}
    </div>
  );
};

export default Home;
