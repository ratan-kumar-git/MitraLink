//import package
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import file
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// config
dotenv.config();
connectDB();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Hello from server !!");
});

//start server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} | http://localhost:${PORT}`);
});
