import express from "express";
import * as albumControllers from "../controllers/albumController"

const router = express.Router();

router.post("/createAlbum", albumControllers.createAlbum);
router.get("/hetAllAlbums", albumControllers.getAlbums);
router.get("/getAlbumById/:id", albumControllers.getAlbumById);
router.delete("/deleteAlbumWithId/:id", albumControllers.deleteAlbum);

export default router;
