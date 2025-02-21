import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        if (!user) {
            console.log("User not found");
            return
        }
        const accessToken = user.generateAccessToken()
        if (!accessToken) {
            console.log("Access token not generated");
            return 
        }
        const refreshToken = user.generateRefreshToken()

        if (!refreshToken) {
            console.log("Refresh token not generated");
            return
        }

        console.log(accessToken, refreshToken, user._id);

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.error("Error generating access and refresh tokens:", error);
    }
}

const registerUser = asyncHandler(async (req, res, next) => {
    const {email, fullname, password, phoneNumber} = req.body
    console.log(email, fullname, password, phoneNumber);
    

    if ([fullname, email, password].some((field) => field?.trim() === "")) {
        return res.status(400).send({message: "ALL FEILDS ARE REQUIRED"})
    }

    const existedUser = await User.findOne({
        $or: [{email}, {phoneNumber}]
    })

    if (existedUser) {
        console.log(existedUser);
        return res.status(401).send({message: "USER WITH THIS EMAIL OR MOBILE NUMBER EXIST"})
    }

    const newUser = new User({
        email,
        fullname,
        password,
        phoneNumber,
    });

    console.log(newUser);
    
    await newUser.save();

    const createdUser = await User.findOne({email}).select("-password")
    if (!createdUser) {
        res.status(500).send({message: "USER NOT CREATED"})
    }

    return res.status(200).send({message: "USER CREATED", user: createdUser})
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => field.trim() === "")) {
        return res.status(400).send({ message: "EMAIL AND PHONE NUMBER ARE REQUIRED" });
    }

    const checkUser = await User.findOne({email});

    if (!checkUser) {
        return res.status(404).send({ message: "USER DOES NOT EXIST" });
    }

    const isPasswordCorrect = await checkUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(401).send({ message: "INVALID PASSWORD" });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(checkUser._id);
    const loggedInUser = await User.findById(checkUser._id).select("-password");

    console.log(accessToken, refreshToken, loggedInUser);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    

    return res.status(200).send({
        message: "USER LOGGED IN",
        user: loggedInUser,
        accessToken,
        refreshToken
    })
});


const uploadAvatar = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const avatarFile = req.file?.path;
  
    if (!avatarFile) {
      return res.status(400).json({ message: "No avatar file provided." });
    }
  
    const avatarUrl = await uploadOnCloudinary(avatarFile);
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
  
    user.avatar = avatarUrl;
    await user.save();
  
    res.status(200).json({ message: "Avatar uploaded successfully.", avatar: avatarUrl });
});

const uploadAdress = asyncHandler(async (req, res) => {
    const {address} = req.body;
    console.log(address);
  
    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
  
    user.addresses = address;
    await user.save();
  
    res.status(200).json({ message: "Address updated successfully." });
  });
  

export {registerUser, loginUser, uploadAvatar, generateAccessAndRefereshTokens, uploadAdress}