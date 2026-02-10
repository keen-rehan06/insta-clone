    import userModel from "../models/user.model.js"
    import bcrypt from "bcrypt"
    import generateToken from "../config/jwtToken.js"

   export const createUser = async (req,res) => {
     try {
    const {name,username,email,password} = req.body;
    const hash = await bcrypt.hash(password,12); 
    const user = await userModel.create({
        name,   
        username,
        email,
        password:hash 
    })
    const newUser = await userModel
   .findById(user._id)
   .select("-password");
    const token = generateToken(user);
    res.cookie("token",token);
    res.status(201).send({message:"User created Successfully!",data:newUser })
     } catch (error) {
        res.status(500).send({message:"Error",data:error})
     }  
}

 export const loggedInUser = async (req,res) => {
     try {
    const {email,password} = req.body;
    const hash = await bcrypt.hash(password,12); 
    const user = await userModel.findOne({email})

    const comparePassword =  bcrypt.compare(password,user.password)
     if(!comparePassword) return res.status(402).send({message:"Incorrect Password!"})
    const newUser = await userModel
   .findById(user._id)
   .select("-password");
    const token = generateToken(user);
    res.cookie("token",token);
    res.status(201).send({message:"User login Successfully!",data:newUser })
     } catch (error) {
        res.status(500).send({message:"Error",data:error})
     }  
}