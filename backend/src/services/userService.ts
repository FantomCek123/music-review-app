import User, { IUser, INewUser } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "supersecret";

export const createUserService = async (data: INewUser): Promise<IUser> => {
  const existingUser = await User.findOne({
    $or: [{ username: data.username }, { email: data.email }],
  });

  if (existingUser) {
    throw new Error("Username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({
    ...data,
    password: hashedPassword,
  });
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

export async function verifyUser(verificationToken: string): Promise<IUser | null> {

    const user: IUser | null = await User.findOne({ verificationToken: verificationToken });

    if (user){
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
    }

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
