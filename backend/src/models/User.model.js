import {Schema, model} from "mongoose";
import  bcrypt  from 'bcrypt';

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
    }
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



export const User = model("User", userSchema)