import User from "../models/userModal.js";
import Message from "../models/messageModal.js";
import Group from "../models/groupModel.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members, groupImage } = req.body;
    const adminId = req.user._id;

    if (!name || !members || members.length === 0) {
      return res.status(400).json({ message: "Name and members are required" });
    }

    // Ensure admin is also in members list
    if (!members.includes(adminId.toString())) {
      members.push(adminId);
    }

    // Validate users exist
    const users = await User.find({ _id: { $in: members } });
    if (users.length !== members.length) {
      return res.status(400).json({ message: "Some users not found" });
    }

    const newGroup = await Group.create({
      name,
      members,
      admin: adminId,
      groupImage: groupImage || null,
    });

    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error creating group:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const myGroup = async (req, res) => {
  try {
    const myGroups = await Group.find({ members: req.user._id });
    res.status(200).json(myGroups);
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGroupUserAndMessage = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    // Find group and populate members + admin
    const group = await Group.findById(groupId)
      .populate("members", "fullName email profilePic")
      .populate("admin", "fullName email profilePic");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Fetch all messages in this group
    const messages = await Message.find({ groupId })
      .populate("senderId", "_id, fullName email profilePic") // populate sender details
      // .sort({ createdAt: 1 });

    res.status(200).json({
      group,
      messages,
    });
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
