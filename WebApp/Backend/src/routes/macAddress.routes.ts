import { Router } from "express";
import {
  addMacAddress,
  getAllMacAddress,
  removeMacAddress,
  updateBtnState,
  getButtonByMacAddress,
} from "../controllers/macAddress.controller";

const router: Router = Router();

/**
 * Add new Macaddress
 * @body
 * macAddress - {string}
 */
router.post("/add", addMacAddress);

/**
 * Get All Macaddress of LoggedIn User
 */
router.get("/all", getAllMacAddress);

/**
 * Delete Macaddress of LoggedIn User
 * @body
 * macAddress - {string}
 */
router.patch("/remove", removeMacAddress);

/**
 * Delete Macaddress of LoggedIn User
 * @body
 * macAddress - {string}
 */
router.patch("/updateBtnState", updateBtnState);

/**
 * Get Button By Macaddress
 * @body
 * macAddress - {string}
 */
router.get("/button/:macAddress", getButtonByMacAddress);

export default router;
