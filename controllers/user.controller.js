import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../config/jwtToken.js";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = await userModel.create({
      name,
      username,
      email,
      password: hash,
    });
    const newUser = await userModel.findById(user._id).select("-password");
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res
      .status(201)
      .send({ message: "User created Successfully!", data: newUser });
  } catch (error) {
    res.status(500).send({ message: "Error", data: error });
  }
};

export const loggedInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const newUser = await userModel.findById(user._id).select("-password");
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) return res.status(402).send("Something went wrong Error:", err);
      if (!result)
        return res.status(402).send({ message: "Incorrect Password!" });
      const token = generateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.render("feed")
    });
  } catch (error) {
    res.status(500).send({ message: "Error", data: error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
   httpOnly: true,
   secure: true,
   sameSite: "none"
})
res.status(200).send({ message: "User Logout Successfully!!" });
  } catch (error) {
    return res.send("Logout failed");
  }
};
