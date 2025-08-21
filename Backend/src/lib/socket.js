import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/messageModal.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URI],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; //{userId: socket.id}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ============ 1-to-1 chat ============

  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { senderId });
    }
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", { senderId });
    }
  });

  socket.on("message:delivered", async (messageId) => {
    await Message.findByIdAndUpdate(messageId, { status: "delivered" });
    io.emit("message:status", { messageId, status: "delivered" });
  });

  socket.on("message:seen", async (messageId) => {
    await Message.findByIdAndUpdate(messageId, { status: "seen" });
    io.emit("message:status", { messageId, status: "seen" });
  });

  // ============ Group Chat ============

  // join a group room
  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`User ${userId} joined group ${groupId}`);
  });

  // send message to group
  socket.on("group:sendMessage", async ({ groupId, message }) => {
    // here message already saved in API, so just broadcast
    io.to(groupId).emit("group:newMessage", message);
  });

  // group typing
  socket.on("group:typing", ({ groupId, senderId }) => {
    socket.to(groupId).emit("group:typing", { groupId, senderId });
  });

  socket.on("group:stopTyping", ({ groupId, senderId }) => {
    socket.to(groupId).emit("group:stopTyping", { groupId, senderId });
  });

  // ============ Disconnect ============
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
