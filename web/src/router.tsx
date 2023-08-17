import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="*" element={<Signin />} />
    </Routes>
  );
};

export default Router;
