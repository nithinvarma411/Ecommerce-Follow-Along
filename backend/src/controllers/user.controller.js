import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
        return res.status(401).send({message: "USER WITH THIS EMAIL OR MOBILE NUMBER EXIST"})
    }

    const newUser = new User({
        email,
        fullname,
        password,
        phoneNumber,
    });
    
    await newUser.save();

    const createdUser = await User.findOne({email}).select("-password")
    if (!createdUser) {
        res.status(500).send({message: "USER NOT CREATED"})
    }

    return res.status(200).send({message: "USER CREATED", user: createdUser})
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, phoneNumber } = req.body;

    if ([email, password].some((field) => field.trim() === "")) {
        return res.status(400).send({ message: "EMAIL AND PHONE NUMBER ARE REQUIRED" });
    }

    const checkUser = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    });

    if (!checkUser) {
        return res.status(404).send({ message: "USER DOES NOT EXIST" });
    }

    if (checkUser.email !== email || checkUser.phoneNumber !== phoneNumber) {
        return res.status(400).send({ message: "EMAIL AND PHONE NUMBER DO NOT MATCH" });
    }

    const isPasswordCorrect = await checkUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(401).send({ message: "INVALID PASSWORD" });
    }

    const loggedInUser = await User.findById(checkUser._id).select("-password");

    res.status(200).send({
        message: "USER LOGGED IN SUCCESSFULLY",
        data: {
            user: loggedInUser
        }
    });
});


const uploadAvatar = asyncHandler(async (req, res) => {
    const userId = req.params.id;
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


export {registerUser, loginUser, uploadAvatar}