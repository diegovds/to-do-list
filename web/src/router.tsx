import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./contexts/Context";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";

const Router = () => {
  const { state } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!state.user.token ? <Signin /> : <Todos />} />
        <Route
          path="/signin"
          element={!state.user.token ? <Signin /> : <Todos />}
        />
        <Route
          path="/signup"
          element={!state.user.token ? <Signup /> : <Todos />}
        />
        <Route
          path="/todos"
          element={!state.user.token ? <Signin /> : <Todos />}
        />
        <Route path="*" element={!state.user.token ? <Signin /> : <Todos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
