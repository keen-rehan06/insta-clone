import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cookieParser from 'cookie-parser';
import connectDb from "./db/db.js";
import { fileURLToPath } from "url";
import path from "path";
import postModel from './models/post.model.js';
import userRoute from "./routes/user.routes.js"
import userModel from './models/user.model.js';
import { isLoggedIn } from './middlewares/auth.middleware.js';

(async()=>{
    try {
        await connectDb();
        console.log('MongoDb Connected Successfully!')
    } catch (error) {
        console.log(`MongoDb connection Failed:`,error)  
    }
})()

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());
app.set("view engine","ejs")

app.use("/user",userRoute)

app.get("/",function(req,res){
    res.render("login")
    console.log(req.user)
})

app.get("/feed",isLoggedIn, async (req, res) => {
    const user = await userModel.findById(req.user._id);
   const posts = await postModel.find().populate("user");
   res.render("feed", { posts,user });
});

app.get("/profile",isLoggedIn, async (req,res)=>{
   const user = await userModel.findById(req.user._id);
    console.log(user)
   res.render("profile",{ user });
});

app.get("/edit",isLoggedIn,async function(req,res){
    const user = await userModel.findById(req.user._id);
    res.render("editProfile",{user})
})

app.get("/post",isLoggedIn,async function(req,res) {
    res.render("createPost")
})

app.get("/search",isLoggedIn,async function(req,res){
    res.render("search");
})

app.listen(3000,function(){
    console.log("App is running on port 3000");
})