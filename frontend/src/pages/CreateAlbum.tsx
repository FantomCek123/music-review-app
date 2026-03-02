import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/api";

const CreateAlbum = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !artist.trim() || !year.trim() || !genre.trim()) {
    alert("Please fill in all fields!");
    return;
  }


    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      await api.createAlbum({
        title,
        artist,
        year: Number(year),
        genre: genre.split(",").map((g) => g.trim()),
        user: user._id, 
      });
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to create album");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Add New Album</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 400,
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <input
          placeholder="Genres (comma separated)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Create Album
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;