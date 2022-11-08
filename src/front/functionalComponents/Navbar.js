import React from "react";
import { Link } from "react-router-dom";
import ButtonLogin from "./styled-components/ButtonLogin";
import ButtonSignUp from "./styled-components/ButtonSignUp";
import ContainerNavbar from "./styled-components/ContainerNavbar";

const Navbar = () => {
  return (
    <ContainerNavbar>
      <ButtonLogin>
        <Link to="/login">Login</Link>
      </ButtonLogin>
      <ButtonSignUp>
        <Link to="/signup">Sign up</Link>
      </ButtonSignUp>
    </ContainerNavbar>
  );
};

export default Navbar;
