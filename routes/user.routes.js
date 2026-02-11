import express from "express"
import { userSignupMiddleware,userLoginMiddleware, isLoggedIn } from "../middlewares/auth.middleware.js";
import { createUser,loggedInUser, logoutUser, createPost} from "../controllers/user.controller.js";
import upload from "../config/multer.config.js"
const app = express.Router();

app.post("/create",userSignupMiddleware,createUser);
app.post("/login",userLoginMiddleware,loggedInUser);
app.post("/logout",isLoggedIn,logoutUser)
app.post("/post",isLoggedIn,upload.single('image'),createPost) 

export default app