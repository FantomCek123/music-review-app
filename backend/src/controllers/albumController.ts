import { Request, Response } from "express";
import Album, { IAlbum } from "../models/album";

export const createAlbum = async (req: Request, res: Response) => {
  try {
    const album: IAlbum = await Album.create(req.body);
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getAlbums = async (_req: Request, res: Response) => {
  const albums = await Album.find();
  res.json(albums);
};

export const getAlbumById = async (req: Request, res: Response) => {
  const album = await Album.findById(req.params.id);
  if (!album) return res.status(404).json({ message: "Album not found" });
  res.json(album);
};
