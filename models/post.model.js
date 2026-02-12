import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
media:{
    type:String,
    required:true
},
caption:{
    type:String,
},
like:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    default:0
}],
date:{
    type:Date,
    default:Date.now()
},
})

const postModel = new mongoose.model("post",postSchema);
export default postModel;