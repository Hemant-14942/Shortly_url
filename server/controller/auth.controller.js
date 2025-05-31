import express from "express";
import userModel from "../model/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import sessionModel from "../model/session.model.js";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validator/auth-validator.js";


export const registerPost = async (req, res) => {
  try {
    const result = registerUserSchema.safeParse(req.body);
    // console.log(result); 

    if (!result.success) {
      // console.log(result.error.errors[0].message);
      return res.status(400).json({ message: result.error.errors[0].message });
    }

    const { username, email, password } = result.data;
    // const { username, email, password } = req.body;
    // console.log(result.data);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const session = new sessionModel({
      user: newUser._id,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    await session.save();

    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: session._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // console.log(
    //   "accessToken--->",
    //   accessToken,
    //   "     ",
    //   "refreshtoken--->",
    //   refreshToken
    // );

    const baseConfig = { httpOnly: true, secure: true,
      sameSite: 'lax' };

    res.cookie("access_token", accessToken, {
      ...baseConfig,
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("refresh_token", refreshToken, {
      ...baseConfig,
      maxAge: REFRESH_TOKEN_EXPIRY,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// login code.
export const loginPost = async (req, res) => {
  try {
      // const { email, password } = req.body;
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      // console.log(result.error.errors[0].message);
      return res.status(400).json({ message: result.error.errors[0].message });
    }
    const { email, password } = result.data;
    // console.log(result.data);
    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "please fill up correct pasword" });
    }

    // Create new session
    const session = new sessionModel({
      user: user._id,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    await session.save();

    // Create access and refresh tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: session._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // console.log(
    //   "accessToken--->",
    //   accessToken,
    //   "     ",
    //   "refreshtoken--->",
    //   refreshToken
    // );

    const baseConfig = { httpOnly: true,secure: true, 
      sameSite: 'lax'};

    res.cookie("access_token", accessToken, {
      ...baseConfig,
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("refresh_token", refreshToken, {
      ...baseConfig,
      maxAge: REFRESH_TOKEN_EXPIRY,
    });
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({ message: "Login successful", accessToken  });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutPost = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getMe = async (req, res) => {
  try {
    console.log("req.user--->", req.user);
    console.log("req.user.id--->", req.user.id);
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
