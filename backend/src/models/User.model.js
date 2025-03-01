import {Schema, model} from "mongoose";
import  bcrypt  from 'bcrypt';
import jwt from "jsonwebtoken"


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    refreshToken: {
        type: String
    },
    addresses:[
        {
          country: {
            type: String,
          },
          city:{
            type: String,
          },
          address1:{
            type: String,
          },
          address2:{
            type: String,
          },
          zipCode:{
            type: Number,
          },
          addressType:{
            type: String,
          },
        }
        
      ],
})


userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = model("User", userSchema)