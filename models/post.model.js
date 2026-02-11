import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
image:{
    type:String,
    default:"India"
},
caption:{
    type:String,
},
like:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
date:{
    type:Date,
    default:Date.now()
},
})

const postModel = new mongoose.model("post",postSchema);
export default postModel;