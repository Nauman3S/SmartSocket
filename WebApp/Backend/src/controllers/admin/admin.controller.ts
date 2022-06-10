import { Request, Response } from "express";
import { Ota, Mqtt, User, MacAddress } from "../../models";
// import { IOta } from "../../types/types";
import { uploadFile, deleteFile } from "../../libraries/multer";
import { promisify } from "util";
import fs from "fs";

/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */

export const uploadFileToS3 = async (req: Request, res: Response) => {
  try {
    const unlinkFile = promisify(fs.unlink);

    const file = req?.file as Express.Multer.File;

    const result: any = await uploadFile(file);
    unlinkFile(file.path);

    const ota = await Ota.create({
      userId: req?.user?._id,
      fileURL: result.Location,
      fileName: file?.originalname,
      key: result.Key,
    });
    ota.save();

    return res.status(200).json({ message: "File Uploaded" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */

export const deleteFileFromS3 = async (req: Request, res: Response) => {
  try {
    // const { Key }: { Key: string } = req?.body;

    //Deleting File from S3
    await deleteFile(req?.params.key);

    //Deleting File from DB
    await Ota.findOneAndDelete({ key: req.params.key });

    return res.status(200).json({ message: "File Deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Files
 * @param {Request} req
 * @param {Request} req
 */
export const getAllFiles = async (_req: Request, res: Response) => {
  try {
    const ota = await Ota.find();
    return res.status(200).json({ ota });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const dashboardCounts = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.countDocuments({ role: "client" });

    const macAddressess = await Mqtt.countDocuments();
    const mqtt = await Mqtt.countDocuments();
    const ota = await Ota.countDocuments();

    return res.status(200).json({ users, macAddressess, mqtt, ota });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Users
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find({ role: "client" });
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Users Macaddress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllUsersMacaddress = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const Macaddressess = await MacAddress.find().populate({
      path: "userId",
      select: "-password",
    });
    return res.status(200).json({ Macaddressess });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Users MqttData
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllUsersMqttData = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const mqttData = await Mqtt.find();
    return res.status(200).json({ mqttData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
