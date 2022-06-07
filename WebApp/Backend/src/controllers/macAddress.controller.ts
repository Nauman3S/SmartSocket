import { Request, Response } from "express";
import { MacAddress } from "../models";
import { IMacAddress } from "../types/types";

/**
 * Get All Macaddress of LoggedIn User
 * @param {Request} req
 * @param {Request} req
 */
export const getAllMacAddress = async (
  req: Request,
  res: Response
): Promise<Response<IMacAddress>> => {
  try {
    const macAddress = await MacAddress.findOne({ userId: req?.user?._id });

    return res.status(200).json({ data: macAddress });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
export const addMacAddress = async (req: Request, res: Response) => {
  try {
    await MacAddress.findOneAndUpdate(
      { userId: req?.user?._id },
      {
        $push: { macAddress: req?.body?.macAddress },
      },
      { upsert: true }
    );
    return res.status(200).json({ message: "MacAddress Added Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Add New Macaddress
 * @param {Request} =req
 * @param {Request} req
 */
export const removeMacAddress = async (req: Request, res: Response) => {
  try {
    await MacAddress.findOneAndUpdate(
      { userId: req?.user?._id },
      {
        $pull: { macAddress: req?.body?.macAddress },
      }
    );
    return res.status(200).json({ message: "MacAddress Deleted!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
