import { Request, Response } from "express";
import { isNewUser } from "../utils/typeGuards";
import * as us from "../services/userService";


export const createUser = async (req: Request, res: Response) => {
  try {
    if (!isNewUser(req.body)) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const user = await us.createUserService(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const getUsers = async (_req: Request, res: Response) => {
  const users = await us.getUsersService();
  res.json(users);
};


export const getUserById = async (req: Request, res: Response) => {
  const user = await us.getUserByIdService(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await us.deleteUserService(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted", user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getUserByVerificationToken = async (req: Request, res: Response) => {

  const user = await us.getUserByVerificationToken(req.params.verificationToken);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};


export const verifyUser = async (req: Request, res: Response) => {

  const user = await us.verifyUser(req.params.verificationToken);

   if (!user) {
    return res.status(404).json({ message: "Invalid or expired token." });
  }

  res.json(user);
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await us.loginUserService(email, password);

    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

