import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"
import Message from "../models/messageModal.js"
import User from "../models/userModal.js"

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUserForSidebar: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}


export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        // upload base64 image to cloudinary
        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        // create new message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessages: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}
