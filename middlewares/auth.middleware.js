import userModel from "../models/user.model.js";

export const userSignupMiddleware = async (req, res,next) => {
    try {
        const { name, username, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) return res.status(500).send({ message: `User ${email} Already registerd!` })
    if (!name || !username || !email || !password) return res.status(500).send({ message: "All fields are required!" });
    if (password.length < 6) return res.status(500).send({ message: "Password length must be 6 charecters" })
    if (name.length < 3) return res.status(500).send({ message: "name length must be 3 charecters" })
    next()
    } catch (error) {
      console.log(error)     
    }
}

export const userLoginMiddleware = async (req,res,next) => {
    try {
        const {email,password} = req.body;
    if(!email||!password) return res.status(500).send({message:"All fields are required!"});
    const user = await userModel.findOne({email})
    if(!user) return res.status(404).send({message:"User not found!"});
    next();
    } catch (error) {
        res.status(500).send({message:"Server Error:",error})
    }
}