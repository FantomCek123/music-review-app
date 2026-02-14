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
  const album = await as.getAlbumByIdService(req.params.id);

  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }

  res.json(album);
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
