import express from "express";
import * as userControllers from "../controllers/userController";


const router = express.Router();


router.post("/", userControllers.createUser);
router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUserById);
router.delete("/:id", userControllers.deleteUser);

export default router;
