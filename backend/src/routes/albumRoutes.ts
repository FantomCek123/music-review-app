import express from "express";
import * as albumControllers from "../controllers/albumController"

const router = express.Router();

router.post("/createAlbum", albumControllers.createAlbum);
router.get("/getAllAlbums", albumControllers.getAlbums);
router.get("/getAlbumById/:id", albumControllers.getAlbumById);
router.delete("/deleteAlbumWithId/:id", albumControllers.deleteAlbum);
router.get("/getAlbumByName", albumControllers.searchAlbumsByName);
router.get("/getByArtist", albumControllers.searchAlbumsByArtist);
router.get("/getAlbumsByUser/:userId", albumControllers.getAlbumsByUser);
router.patch("/updateArtist/:id", albumControllers.updateAlbumArtist);
router.patch("/updateYear/:id", albumControllers.updateAlbumYear);
router.patch("/updateGenre/:id", albumControllers.updateAlbumGenre);


export default router;
