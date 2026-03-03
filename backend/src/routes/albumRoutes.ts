import express from "express";
import * as albumControllers from "../controllers/albumController"
import multer from "multer";
import path from "path";


const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});


router.post("/createAlbum",upload.single("image"),albumControllers.createAlbum);
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
