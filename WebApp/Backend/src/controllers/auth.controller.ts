import { Request, Response } from "express";
import { userFind, userExists, validateEmail } from "../helpers";
import { User } from "../models";
import { IUserDocument } from "../types/types";

/**
 * This Function allows User to login To his respective Dashboard based on Role [Admin, Client]
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req?.body;
    const user = await userFind({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ message: "User not exists on this email" });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Email/Password does not match" });
    }

    const token = await user.getToken();
    res.status(200).json({ message: "Logged In", token, role: user.role });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

/**
 * Creates new instance of User in database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const signUp = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
    }: { fullName: string; email: string; password: string } = req?.body;

    if (await userExists(email)) {
      return res
        .status(500)
        .json({ message: `User already registered with this email ${email}` });
    }

    if (!(await validateEmail(email))) {
      return res
        .status(500)
        .json({ message: "Please enter correct email address" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    user.save();
    return res.status(200).json({ message: "User Signed Up Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

/**
 * Get :Logged In User Profile from database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const myProfile = async (
  req: Request,
  res: Response
): Promise<Response<IUserDocument>> => {
  try {
    const user = await User.findById(req?.user?._id).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};
