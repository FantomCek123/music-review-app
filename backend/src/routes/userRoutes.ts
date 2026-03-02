import express from "express";
import * as userControllers from "../controllers/userController";


const router = express.Router();


router.post("/register", userControllers.createUser);
router.get("/getAllUsers", userControllers.getUsers);
router.get("/getUserWithId/:id", userControllers.getUserById);
router.delete("/deliteUserWithId/:id", userControllers.deleteUser);
router.post("/login", userControllers.loginUser);
router.get("/verify", userControllers.verifyUserController);


export default router;
