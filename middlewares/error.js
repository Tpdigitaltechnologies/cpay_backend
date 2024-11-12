import ErrorHandler from "../utils/ErrorHandler.js";

const ErrorMiddleware = (err,req, res, next) =>{

    err.stausCode = err.stausCode || 500;
    err.message = err.message || "Internal Server Error";

        //Wrong mongodb id error
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid ${err.path}`;
            err = new ErrorHandler(message, 400);
        };
    
        //Duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            err = new ErrorHandler(message, 400);
        };
    
        //Wrong jwt error
        if (err.name === 'JsonWebTokenError') {
            const message = `Invalid JWT. Try again`;
            err = new ErrorHandler(message, 400);
        };
    
        //JWT expired error
        if (err.name === 'TokenExpiredError') {
            const message = `JWT is expired. Try again`;
            err = new ErrorHandler(message, 400);
        };

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });

};

export default ErrorMiddleware;