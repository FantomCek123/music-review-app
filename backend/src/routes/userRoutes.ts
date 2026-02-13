import express from "express";
import { createUser, getUsers, getUserById } from "../controllers/userController";


const router = express.Router();


router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteReview);

export default router;
