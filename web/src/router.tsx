import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Context } from "./contexts/Context";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import WelcomePage from "./pages/WelcomePage";

const Router = () => {
  const { state } = useContext(Context);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-dvh">
        <div className="flex flex-1">
          <Routes>
            <Route
              path="/"
              element={!state.user.token ? <WelcomePage /> : <Todos />}
            />
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
              element={!state.user.token ? <WelcomePage /> : <Todos />}
            />
            <Route
              path="*"
              element={!state.user.token ? <WelcomePage /> : <Todos />}
            />
          </Routes>
        </div>
        <Footer className="h-14" />
      </div>
    </BrowserRouter>
  );
};

export default Router;
