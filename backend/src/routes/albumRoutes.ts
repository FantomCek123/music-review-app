import express from "express";
import { createAlbum, getAlbums, getAlbumById } from "../controllers/albumController"

const router = express.Router();

// Dodavanje albuma
router.post("/", createAlbum);

// Dobavljanje svih albuma
router.get("/", getAlbums);

// Dobavljanje albuma po ID
router.get("/:id", getAlbumById);

export default router;
