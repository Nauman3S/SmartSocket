import { Router } from "express";
import {
  uploadFileToS3,
  deleteFileFromS3,
  dashboardCounts,
  getAllUsers,
  getAllUsersMacaddress,
  getAllUsersMqttData,
  getAllFiles,
  getOneUsersMqttData,
} from "../controllers/admin/admin.controller";
import multer from "multer";
const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const router: Router = Router();

/**
 * @body
 * file - Express.Multer.File
 */
router.post("/ota/upload", upload.single("file"), uploadFileToS3);

/**
 * @body
 * key - string
 */
router.delete("/ota/delete/:key", deleteFileFromS3);

/**
 * Get All Files
 */
router.get("/ota", getAllFiles);

/**
 * Get Dashbord Counts
 */
router.get("/count", dashboardCounts);

/**
 * Get All Users
 */
router.get("/all-users", getAllUsers);

/**
 * Get All Users Macaddress
 */
router.get("/all-macAddress", getAllUsersMacaddress);

/**
 * Get All Users Mqtt Data
 */
router.get("/all-mqttData", getAllUsersMqttData);

/**
 * Get All Users Mqtt Data
 */
router.get("/mqttData", getOneUsersMqttData);

export default router;
