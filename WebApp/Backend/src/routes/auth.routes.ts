import { Router } from "express";
import { login, signUp, myProfile } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth";

const router: Router = Router();

/**
 * Login User
 * @body
 * email - {string}
 * password - {string}
 */
router.post("/login", login);

/**
 * Signup User
 * @body
 * email - {string}
 * password - {string}
 */
router.post("/signup", signUp);

/**
 * User Profile
 */
router.get("/my-profile", isAuthenticated, myProfile);

export default router;
