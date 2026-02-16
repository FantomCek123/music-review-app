import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/api";


const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.registerUser({
        username,
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      console.log(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Registration failed " + err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        margin: "50px auto",
        gap: 10,
      }}
    >
      <h2>Register</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 8 }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 8 }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: 10,
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
