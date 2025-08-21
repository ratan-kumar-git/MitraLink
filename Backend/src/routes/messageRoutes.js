import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getMessages,
  getUserForSidebar,
  sendGroupMessages,
  sendMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessages);
router.post("/send-group/:groupId", protectRoute, sendGroupMessages);

export default router;
