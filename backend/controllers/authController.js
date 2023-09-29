import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// user registration

export const register = async (req, res) => {

  try {

    //hashing password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create. Try again" });
  }
};

// user login

export const login = async (req, res) => {


  const email = req.body.email;

  try {

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // if user exist then check password and compare the password 

    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password
    );

    // if password is incorrect

    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    // create jwt token

    const token = jwt.sign({ id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 36000 }
    );

    // set token in the browser cookies and send the response to the client

    res.cookie("accessToken", token, {
      httpOnly: true,
      expires: token.expiresIn,
    })
      .status(200).json({
        success: true, message: "successfully login", data: { _id: user._id,username:user.username , email: user.email, role: user.role }
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};


