import { useNavigate } from "react-router-dom";
import AlbumForm from "../components/AlbumForm";
import AlbumList from "../components/AlbumList";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const refresh = () => window.location.reload();

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleLogout}>Logout</button>

      <h1>🎵 Music App</h1>

      <AlbumForm refresh={refresh} />
      <AlbumList />
    </div>
  );
};

export default Home;
