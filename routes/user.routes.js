import express from "express"
import { createUser,loggedInUser, logoutUser } from "../controllers/user.controller.js";
import { userSignupMiddleware,userLoginMiddleware, isLoggedIn } from "../middlewares/auth.middleware.js";
const app = express.Router();

app.post("/create",userSignupMiddleware,createUser);
app.post("/login",userLoginMiddleware,loggedInUser);
app.post("/logout",isLoggedIn,logoutUser)

export default app