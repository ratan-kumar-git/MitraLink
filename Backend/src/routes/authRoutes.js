import express from "express";
import {
  checkAuth,
  loginController,
  signupController,
  updateProfileController,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.put("/update-profile", protectRoute, updateProfileController);
router.get("/check", protectRoute, checkAuth)

export default router;
