import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Welcome Home!</h2>
      <button onClick={handleLogout} style={{ padding: 10, marginTop: 20 }}>Logout</button>
    </div>
  );
};

export default Home;
