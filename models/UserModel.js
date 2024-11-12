import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email address"],
        unique: true,
    },
    phone:{
        type: String,
        required: [true, "Please enter your phone number"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    // dob:{
    //     type: Date,
    //     required: [true, "Please enter your date of birth"]
    // },
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer",
    },
    // avatar: {
    //     public_id: String,
    //     url: String,
    // },
    isVerified: {
        type: Boolean,
        default: false,
    }
},{ timestamps: true });


schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();

});


schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
}


schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



export const User = mongoose.model("User", schema);