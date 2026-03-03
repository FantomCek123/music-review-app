import React, { useState } from "react";
import EditMyAlbum from "./EditMyAlbum";
import type { Album } from "../api/api";
import * as api from "../api/api";

interface MyAlbumListProps {
  albums: Album[];
}

const MyAlbumList: React.FC<MyAlbumListProps> = ({ albums }) => {
  const [myAlbums, setMyAlbums] = useState(albums);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this album?")) return;

    try {
      await api.deleteAlbum(id);
      setMyAlbums(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete album");
    }
  };

  return (
    <div>
      {myAlbums.map(album => (
        <EditMyAlbum key={album._id} album={album} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default MyAlbumList;