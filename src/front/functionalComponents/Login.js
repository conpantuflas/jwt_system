import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RenderUser from "./RenderUser";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");

  // const tokenLogin = {
  //   token: "",
  //   userId: 0,
  // };

  const navigate = useNavigate();
  const login = useCallback((e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setToken(data.access_token);
        //tokenLogin.userId = data.user.id;
        navigate("/renderuser");
      });
  });

  return (
    <div>
      <form onSubmit={(e) => login(e)}>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <Link
        to="/renderuser"
        onClick={(e) => {
          login(e);
          <RenderUser />;
        }}
      >
        Login
      </Link>
    </div>
  );
};

export default Login;
