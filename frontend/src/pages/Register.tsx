import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/register", { email, password });
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", width: 300, margin: "50px auto" }}>
      <h2>Register</h2>
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
      <button type="submit" style={{ padding: 10 }}>Register</button>
    </form>
  );
};

export default Register;
