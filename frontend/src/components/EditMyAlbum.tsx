import React, { useState } from "react";
import * as api from "../api/api";
import type { Album } from "../api/api";

interface EditMyAlbumProps {
  album: Album; // svaki album koji editujemo
  onDelete: (id: string) => void;
}

const EditMyAlbum: React.FC<EditMyAlbumProps> = ({ album, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [artist, setArtist] = useState(album.artist);
  const [year, setYear] = useState(album.year.toString());
  const [genre, setGenre] = useState(album.genre.join(", "));

  const handleSave = async () => {
    try {
      await api.updateAlbumArtistService(album._id, artist);
      await api.updateAlbumYearService(album._id, parseInt(year));
      await api.updateAlbumGenreService(album._id, genre.split(",").map(g => g.trim()));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update album");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #444",
        padding: 10,
        marginBottom: 8,
        borderRadius: 6,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      {album.imageUrl && (
        <img
          src={`http://localhost:5000/uploads/${album.imageUrl}`}
          alt={album.title}
          style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 4 }}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <h3>{album.title}</h3>

        <div>
          <label>Artist: </label>
          <input
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            disabled={!isEditing}
            style={{ padding: 2, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label>Year: </label>
          <input
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            disabled={!isEditing}
            style={{ padding: 2, borderRadius: 4, border: "1px solid #ccc", width: 80 }}
          />
        </div>

        <div>
          <label>Genre: </label>
          <input
            type="text"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            disabled={!isEditing}
            style={{ padding: 2, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {!isEditing && (
          <>
            <button
              style={{ padding: "6px 12px", borderRadius: 4, border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer", height: 36 }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              style={{ padding: "6px 12px", borderRadius: 4, border: "none", backgroundColor: "#dc3545", color: "#fff", cursor: "pointer", height: 36 }}
              onClick={() => onDelete(album._id)}
            >
              Delete
            </button>
          </>
        )}

        {isEditing && (
          <button
            style={{ padding: "6px 12px", borderRadius: 4, border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer", height: 36 }}
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default EditMyAlbum;