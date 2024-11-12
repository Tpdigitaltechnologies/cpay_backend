import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/error.js";
import UserRouter from "./routes/UserRoute.js"

config({
    path: "./config/.env"
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());

app.use("/api/v1", UserRouter);


export default app;

app.use(ErrorMiddleware);