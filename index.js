import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cookieParser from 'cookie-parser';
import connectDb from "./db/db.js";
import { fileURLToPath } from "url";
import path from "path";
import postModel from './models/post.model.js';
import userRoute from "./routes/user.routes.js"

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
})
app.get("/feed", async (req, res) => {
   const posts = await postModel.find().populate("user");
   res.render("feed", { posts });
});


app.listen(3000,function(){
    console.log("App is running on port 3000")
})