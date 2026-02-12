import userModel from "../models/user.model.js";
import postModel from "../models/post.model.js";
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
    res.redirect("/")
  } catch (error) {
    res.status(500).send("User creating failed!");
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
      res.redirect("/profile");
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
      sameSite: "none",
    });
    res.redirect("/")
  } catch (error) {
    return res.send("Logout failed");
  }
};

export const createPost = async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.file);

    const {user,media,caption } = req.body;

    const findUser = await userModel.findOne({ email: req.user.email });
    if (!findUser) return res.send("User not found");

    const createdPost = await postModel.create({
      user: findUser._id,
      media: req.file.filename,
      caption,
    });

  res.redirect("/feed")

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, name, bio } = req.body;

    let updateData = {
      username,
      name,
      bio
    };

    if (req.file) {
      updateData.picture = req.file.filename;
    }

    await userModel.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    );

    res.redirect("/profile");

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
