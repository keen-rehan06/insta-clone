import express from "express"
import path from "path";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get("/",function(req,res){
    res.send("Hello World!!")
})

app.listen(3000,function(){
    console.log("App is running on port 3000")
})