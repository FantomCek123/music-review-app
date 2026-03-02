import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlbumList from "../components/AlbumList";
import MyAlbumList from "../components/MyAlbumList";
import Navbar from "../components/Navbar";
import * as api from "../api/api";

const Home = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<api.Album[]>([]);
  const [showMyAlbums, setShowMyAlbums] = useState(false); // ✅ prati da li prikazujemo "My Albums"

  /* ================= LOAD MY ALBUMS ================= */
  const loadMyAlbums = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      const data = await api.getAlbumsByUser(user._id);
      setAlbums(data);
      setShowMyAlbums(true); // prikazujemo MyAlbumList sa Edit dugmetima
    } catch (err) {
      console.error("Failed to load user albums", err);
    }
  };

  /* ================= SEARCH CALLBACK ================= */
  const handleSearchResults = (results: api.Album[]) => {
    setAlbums(results);
    setShowMyAlbums(false); // search koristi običan AlbumList bez Edit dugmeta
  };

  return (
    <div style={{ padding: 40 }}>
      <Navbar onSearchResults={handleSearchResults} />

      <div style={{ display: "flex", marginTop: 20, minHeight: "70vh" }}>
        {/* LEFT SIDE — 20% */}
        <div style={{ width: "20%", display: "flex", flexDirection: "column", gap: 12 }}>
          
          <button
            onClick={loadMyAlbums}
            style={{
              padding: "12px 18px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            My Albums
          </button>

          <button
            onClick={() => navigate("/create-album")}
            style={{
              padding: "12px 18px",
              background: "#4caf54",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Add Album
          </button>

        </div>

        {/* VERTICAL LINE */}
        <div
          style={{
            width: "1px",
            background: "#444",
            margin: "0 20px",
          }}
        />

        {/* RIGHT SIDE — 80% */}
        <div style={{ width: "80%" }}>
          {showMyAlbums ? (
            <MyAlbumList albums={albums} />
          ) : (
            <AlbumList albums={albums} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;