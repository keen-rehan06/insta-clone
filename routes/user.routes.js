import express from "express"
import { createUser } from "../controllers/user.controller.js";
import { userSignupMiddleware } from "../middlewares/auth.middleware.js";
const app = express.Router();

app.post("/create",userSignupMiddleware,createUser);

export default app