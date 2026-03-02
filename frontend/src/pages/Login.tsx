import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../api/api";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const user = await api.loginUser({ email, password });
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");

  } catch (err: any) {

    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert("Something went wrong.");
    }

  }
};
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 300, margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: 10, marginBottom: 10 }}>Login</button>
      </form>


      <div style={{ textAlign: "center" }}>
        <span>Don't have an account? </span>
        <Link to="/register">
          <button style={{ padding: 8, marginTop: 5 }}>Register</button>
        </Link>
      </div>
    </div>

    
  );
};

export default Login;
