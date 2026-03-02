import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/navbar.css";
import logo from "../logo.png";
import * as api from "../api/api"; // <-- sve funkcije kroz api namespace

interface IUser {
  username: string;
  email: string;
}

interface NavbarProps {
  onSearchResults: (results: api.Album[]) => void;
}

const Navbar = ({ onSearchResults }: NavbarProps) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<api.Album[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (err) {
      console.error("Failed to parse user:", err);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (!search) {
      setResults([]);
      onSearchResults([]); 
      return;
    }

    const fetchResults = async () => {
      try {
        const [byTitle, byArtist] = await Promise.all([
          api.searchAlbumsByName(search),
          api.searchAlbumsByArtist(search),
        ]);

        const merged = [
          ...byTitle,
          ...byArtist.filter((a) => !byTitle.some((b) => b._id === a._id)),
        ];

        setResults(merged);
        onSearchResults(merged); 
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [search]);
  /* =========================
     UI
  ========================== */
  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>

      {/* SEARCH */}
      <div className="navbar-search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search albums, artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USER */}
      <div
        className="navbar-user"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
        }}
      >
        {user ? (
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer", display: "flex", gap: 6 }}
            >
              {user.username} ⬇
            </div>

            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "25px",
                  background: "#222",
                  padding: "8px",
                  borderRadius: "6px",
                }}
              >
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};

export default Navbar;