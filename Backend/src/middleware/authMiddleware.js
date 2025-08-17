import jwt from 'jsonwebtoken';
import User from '../models/userModal.js';

export const protectRoute = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.headers.Authorization;
        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next()
        } else {
            res.status(401).json({message: "Unauthorized access"})
        }
    } catch (error) {
        console.log("Error in auth middleware: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}