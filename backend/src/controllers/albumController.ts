import { Request, Response } from "express";
import { isNewAlbum } from "../utils/typeGuards";
import * as as from "../services/albumService";

export const createAlbum = async (req: Request, res: Response) => {
  try {
    if (!isNewAlbum(req.body)) {
      return res.status(400).json({ message: "Invalid album data" });
    }

    const album = await as.createAlbumService(req.body);
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getAlbums = async (_req: Request, res: Response) => {
  const albums = await as.getAlbumsService();
  res.json(albums);
};

export const getAlbumById = async (req: Request, res: Response) => {
  try {
    const album = await as.getAlbumWithReviewsService(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const album = await as.deleteAlbumService(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json({ message: "Album deleted", album });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const updateAlbum = async (req: Request, res: Response) => {
  try {
    const album = await as.updateAlbumService(req.params.id, req.body);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const searchAlbumsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Missing or invalid 'name' query parameter" });
    }

    const albums = await as.searchAlbumsByNameService(name);
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const searchAlbumsByArtist = async (req: Request, res: Response) => {
  try {
    const { artist } = req.query;

    if (!artist || typeof artist !== "string") {
      return res.status(400).json({ message: "Missing or invalid 'artist' query parameter" });
    }

    const albums = await as.searchAlbumsByArtistService(artist);
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAlbumsByUser = async (req:Request, res:Response) => {
  const { userId } = req.params;

  const albums = await as.getAlbumsByUserService(userId);

  if (!albums) {
      return res.status(404).json({ message: "Albums not found" });
    }

  res.json(albums);
};



export const updateAlbumArtist = async (req: Request, res: Response) => {
  try {
    const { artist } = req.body;
    if (!artist || typeof artist !== "string") {
      return res.status(400).json({ message: "Invalid artist" });
    }

    const album = await as.updateAlbumArtistService(req.params.id, artist);

    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const updateAlbumYear = async (req: Request, res: Response) => {
  try {
    const { year } = req.body;
    if (!year || typeof year !== "number") {
      return res.status(400).json({ message: "Invalid year" });
    }

    const album = await as.updateAlbumYearService(req.params.id, year);

    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const updateAlbumGenre = async (req: Request, res: Response) => {
  try {
    const { genre } = req.body;
    if (!Array.isArray(genre) || genre.some(g => typeof g !== "string")) {
      return res.status(400).json({ message: "Invalid genre" });
    }

    const album = await as.updateAlbumGenreService(req.params.id, genre);

    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

