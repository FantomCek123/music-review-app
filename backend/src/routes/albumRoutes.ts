import express from "express";
import * as albumControllers from "../controllers/albumController"

const router = express.Router();

router.post("/", albumControllers.createAlbum);
router.get("/", albumControllers.getAlbums);
router.get("/:id", albumControllers.getAlbumById);
router.delete("/:id", albumControllers.deleteAlbum);

export default router;
