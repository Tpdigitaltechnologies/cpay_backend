import express from "express";
import { getAllUser, register } from "../controllers/UserController.js";

const router = express.Router();


router.route("/register").post(register);
router.route("/user").get(getAllUser);


export default router;