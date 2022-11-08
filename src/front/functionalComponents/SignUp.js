import React, { useState, useCallback } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = useCallback(() => {
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  });

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="lastname"
          type="text"
          placeholder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button
        onClick={() => {
          signUp();
          console.log(name, lastname, email, password);
        }}
      >
        Crear Sesión
      </button>
    </div>
  );
};

export default SignUp;
