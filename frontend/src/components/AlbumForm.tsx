import { useState } from "react";
import { createAlbum } from "../api/api";

interface Props {
  refresh: () => void;
}

const AlbumForm = ({ refresh }: Props) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState(2024);
  const [genre, setGenre] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

   const userString = localStorage.getItem("user");

    if (!userString) {
      throw new Error("User is not logged in");
    }


    const user = JSON.parse(userString);

    await createAlbum({
      title,
      artist,
      year,
      genre: genre.split(",").map(g => g.trim()),
      user: user.username
    });
    setTitle("");
    setArtist("");
    setGenre("");
    setYear(2024);

    refresh();
  };

  return (
    <form onSubmit={submit}>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Artist"
        value={artist}
        onChange={e => setArtist(e.target.value)}
      />

      <input
        type="number"
        value={year}
        onChange={e => setYear(Number(e.target.value))}
      />

      <input
        placeholder="Genres"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
};

export default AlbumForm;
