import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/jwt.js";


export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return next(new ErrorHandler("Please add all filds", 400));
    };

    let user = await User.findOne({ email, phone });
    if (user) {
        return next(new ErrorHandler("User already exists", 409))
    };

    user = await User.create({
        name,
        email,
        phone, 
        password, 
        
    });

    sendToken(res, user, "Registration Successfully", 201);
    // res.status(200).json({
    //     success: true,
    //     message: "Registration Successfull",
    // })
});


export const login = catchAsyncError(async (req, res, next) => {

    const { phone, password } = req.body;

    if (!phone || !password) {
        return next(new ErrorHandler("Please enter all filds", 400));
    };

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Incorrect email or password", 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Incorrect email or password", 401));

    sendToken(res, user, `Welcome back, ${user.name}`, 200);

});

export const logout = catchAsyncError(async (req, res, next) => {   

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",

    }).json({
        success: true,
        message: "Logged out successfully",
    });

});

export const getAllUser = catchAsyncError(async(req, res, next)=>{
    const user = await User.find({});

    res.status(200).json({
        success: true,
        user
    })
})