import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/api";

const CreateAlbum = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState<File | null>(null);       
  const [preview, setPreview] = useState<string | null>(null); 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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


    const genreList = genre.split(",").map(g => g.trim()); 

    await api.createAlbum({
      title,
      artist,
      year: Number(year),
      genre: genreList,
      user: user._id,
      image: image || undefined,
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

        <input type="file" accept="image/*" onChange={handleImageChange} />


        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: 200, height: 200, objectFit: "cover" }}
          />
        )}

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