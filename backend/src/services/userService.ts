import User, { IUser, INewUser } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "supersecret";
import crypto from "crypto";
import { sendVerificationEmail } from "../mailer/mailer";


export const createUserService = async (data: INewUser): Promise<IUser> => {
  const existingUser = await User.findOne({
    $or: [{ username: data.username }, { email: data.email }],
  });

  if (existingUser) {
    throw new Error("Username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const token = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    ...data,
    password: hashedPassword,
    verified: false,
    verificationToken: token,
  });

  await sendVerificationEmail(newUser.email, token);

  return newUser;

  
};


export const getUsersService = async (): Promise<IUser[]> => {
  return await User.find();
};


export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};


export const deleteUserService = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export async function getUserByVerificationToken(verificationToken: string): Promise<IUser | null> {
    return await User.findOne({verificationToken: verificationToken});
}

export async function verifyUser(verificationToken: string): Promise<IUser> {

    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw new Error("Invalid or expired verification token");
    }

    if (user.verified) {
        throw new Error("User already verified");
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    return user;
}
export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }


  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }


  return user;
};
