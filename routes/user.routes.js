import express from "express"
import { userSignupMiddleware,userLoginMiddleware, isLoggedIn } from "../middlewares/auth.middleware.js";
import { createUser,loggedInUser, logoutUser, createPost,updateProfile,searchUsers} from "../controllers/user.controller.js";
import upload from "../config/multer.config.js"
const app = express.Router();

app.post("/create",userSignupMiddleware,createUser);
app.post("/login",userLoginMiddleware,loggedInUser);
app.get("/logout",isLoggedIn,logoutUser)
app.post("/post",isLoggedIn,upload.single('media'),createPost) 
app.post("/update",isLoggedIn,upload.single('picture'),updateProfile)
app.post("/search",isLoggedIn,searchUsers)

export default app 