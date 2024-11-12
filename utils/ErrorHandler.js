class ErrorHandler extends Error{
    constructor (message, statusCode){
        super(message);
        this.statusCode = statusCode;

        // Capture stack trace to focus on where the error was created
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;