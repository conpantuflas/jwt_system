import "./App.css";
import Login from "./front/functionalComponents/Login";
import Navbar from "./front/functionalComponents/Navbar";
import SignUp from "./front/functionalComponents/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./front/functionalComponents/Welcome";
import RenderUser from "./front/functionalComponents/RenderUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login/renderuser" element={<RenderUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
