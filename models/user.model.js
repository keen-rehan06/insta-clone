import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
         type:String,
        required:true,
        unique:true
    },
    password:{
      type:String,
        required:true
    },
    bio:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    picture:{
        type:String,
        default:'user.png'
    },
    address:{
        type:String
    },
    contact:{
        type:String
    },
    
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"save"
    }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"follower"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"following"
    }]
})

const userModel = new mongoose.model("user",userSchema);
export default userModel;