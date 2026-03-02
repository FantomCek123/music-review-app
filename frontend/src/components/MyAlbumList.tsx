import React, { useState } from "react";
import * as api from "../api/api";

interface MyAlbumListProps {
  albums: api.Album[];
}

const MyAlbumList = ({ albums }: MyAlbumListProps) => {
  const [editableAlbums, setEditableAlbums] = useState(
    albums.map(album => ({
      ...album,
      artist: album.artist,
      year: album.year.toString(),
      genre: album.genre.join(", "),
      isEditing: false, // edit mode
    }))
  );

  const handleEditClick = (id: string) => {
    setEditableAlbums(prev =>
      prev.map(album =>
        album._id === id ? { ...album, isEditing: true } : album
      )
    );
  };

  const handleChange = (id: string, field: "artist" | "year" | "genre", value: string) => {
    setEditableAlbums(prev =>
      prev.map(album =>
        album._id === id ? { ...album, [field]: value } : album
      )
    );
  };

  const handleSave = async (album: typeof editableAlbums[0]) => {
    try {
      await api.updateAlbumArtistService(album._id, album.artist);
      await api.updateAlbumYearService(album._id, parseInt(album.year));
      await api.updateAlbumGenreService(
        album._id,
        album.genre.split(",").map(g => g.trim())
      );

      setEditableAlbums(prev =>
        prev.map(a =>
          a._id === album._id ? { ...a, isEditing: false } : a
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update album");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this album?")) return;

    try {
      await api.deleteAlbum(id);
      // ukloni album iz UI-a
      setEditableAlbums(prev => prev.filter(album => album._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete album");
    }
  };

  return (
    <div>
      {editableAlbums.map(album => (
        <div
          key={album._id}
          style={{
            border: "1px solid #444",
            padding: 10,
            marginBottom: 8,
            borderRadius: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h3>{album.title}</h3>

            <div>
              <label>Artist: </label>
              <input
                type="text"
                value={album.artist}
                onChange={e => handleChange(album._id, "artist", e.target.value)}
                disabled={!album.isEditing}
                style={{ padding: 2, borderRadius: 4, border: "1px solid #ccc" }}
              />
            </div>

            <div>
              <label>Year: </label>
              <input
                type="number"
                value={album.year}
                onChange={e => handleChange(album._id, "year", e.target.value)}
                disabled={!album.isEditing}
                style={{ padding: 2, borderRadius: 4, border: "1px solid #ccc", width: 80 }}
              />
            </div>

            <div>
              <label>Genre: </label>
              <input
                type="text"
                value={album.genre}
                onChange={e => handleChange(album._id, "genre", e.target.value)}
                disabled={!album.isEditing}
                style={{ padding: 2, borderRadius: 4, border: "1px solid #ccc" }}
              />
            </div>

            {album.reviews && album.reviews.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>Reviews:</strong>
                {album.reviews.map((review) => (
                  <div
                    key={review._id}
                    style={{
                      borderTop: "1px solid #555",
                      marginTop: 6,
                      paddingTop: 6,
                      fontSize: 13,
                    }}
                  >
                    <div>⭐ {review.rating}/10</div>
                    <div>{review.comment}</div>
                    <div style={{ opacity: 0.7 }}>
                      By: {review.user?.username || "Unknown"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {!album.isEditing && (
              <>
                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                    height: 36,
                  }}
                  onClick={() => handleEditClick(album._id)}
                >
                  Edit
                </button>

                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    cursor: "pointer",
                    height: 36,
                  }}
                  onClick={() => handleDelete(album._id)}
                >
                  Delete
                </button>
              </>
            )}

            {album.isEditing && (
              <button
                style={{
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                  height: 36,
                }}
                onClick={() => handleSave(album)}
              >
                Save
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAlbumList;