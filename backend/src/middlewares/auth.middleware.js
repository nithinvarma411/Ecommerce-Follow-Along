import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log(req.cookies, req.header("Authorization"));
        
        // console.log(token);
        if (!token) {
            console.log("Access token not found");
            return res.status(403).send({ message: "Access token not found" })
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            return res.status(403).send({ message: "Invalid access token" })
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.error("Error verifying JWT:", error);
    }
    
})