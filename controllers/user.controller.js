import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateToken from "../config/jwtToken.js"

export const createUser = async (req, res) => {
   try {
     const { name, username, email, password } = req.body;
    const hash = bcrypt.hash(password, 12);
    const user = await userModel.create({
        name,
        username,
        email,
        password: hash
    })  
    const newUser = await userModel.findById(user._id).select("-password")
    const token = generateToken(user)
    res.cookie("token",token,{httpOnly:true})
    res.status(200).send({message:"User has been created Successfully!!",data: newUser});
   } catch (error) {
    res.status(500).send("server error",error)
   }
}
