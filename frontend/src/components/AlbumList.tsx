import { useEffect, useState } from "react";
import { getAlbums, deleteAlbum, Album } from "../api/api";
import ReviewSection from "./ReviewSection";

const AlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  const load = async () => {
    const data = await getAlbums();
    setAlbums(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await deleteAlbum(id);
    load();
  };

  return (
    <div>
      <h3>Albums</h3>

      {albums.map(a => (
        <div key={a._id} style={{ border: "1px solid gray", margin: 10 }}>
          <h4>{a.title}</h4>
          <p>{a.artist} ({a.year})</p>
          <p>{a.genre.join(", ")}</p>

          <button onClick={() => remove(a._id)}>
            Delete
          </button>

          
        </div>
      ))}
    </div>
  );
};

export default AlbumList;

//<ReviewSection albumId={a._id} /> linija 35
