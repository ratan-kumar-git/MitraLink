import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { createGroup, getGroupUserAndMessage, myGroup } from '../controllers/groupController.js';


const router = express.Router()

// Create Group: POST /api/groups/create
// Add Members: POST /api/groups/:groupId/add
// Fetch Groups for User: GET /api/groups/my
router.post("/create", protectRoute, createGroup)
router.get("/mygroups", protectRoute, myGroup)
router.get("/:groupId", protectRoute, getGroupUserAndMessage)

export default router;