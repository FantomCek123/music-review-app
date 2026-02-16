import { Request, Response } from "express";
import { isNewUser } from "../utils/typeGuards";
import * as us from "../services/userService";


export const createUser = async (req: Request, res: Response) => {
  try {
    if (!isNewUser(req.body)) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const user = await us.createUserService(req.body);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    });;
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const getUsers = async (_req: Request, res: Response) => {
  const users = await us.getUsersService();

  const safeUsers = users.map(user => ({
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    verified: user.verified
  }));

  res.json(safeUsers);
};


export const getUserById = async (req: Request, res: Response) => {
  const user = await us.getUserByIdService(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    verified: user.verified,
  });;
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

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    verified: user.verified,
  });;
};


export const verifyUser = async (req: Request, res: Response) => {

  const user = await us.verifyUser(req.params.verificationToken);

   if (!user) {
    return res.status(404).json({ message: "Invalid or expired token." });
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    verified: user.verified,
  });;
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await us.loginUserService(email, password);

    res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    verified: user.verified,
  });;
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

