import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
