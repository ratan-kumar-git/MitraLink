import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/messageModal.js";
import User from "../models/userModal.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    // 2. For each user, get the latest message
    const usersWithLastMsg = await Promise.all(
      users.map(async (user) => {
        const lastMsg = await Message.findOne({
          $or: [
            { senderId: loggedInUserId, receiverId: user._id },
            { senderId: user._id, receiverId: loggedInUserId },
          ],
        })
          .sort({ createdAt: -1 })
          .lean();

        return {
          ...user.toObject(),
          lastMessageAt: lastMsg ? lastMsg.createdAt : user.createdAt, // fallback
          lastMessage: lastMsg ? lastMsg.text || "📷 Image" : null,
        };
      })
    );

    // 3. Sort by last message
    usersWithLastMsg.sort(
      (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
    );

    res.status(200).json(usersWithLastMsg);
  } catch (error) {
    console.log("Error in getUserForSidebar: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // upload base64 image to cloudinary
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
