import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../errors/error.js";
import User from "../models/User.js";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const _username = req.body.username;
    const user = await User.findOne({
      username: _username,
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(otherDetails);
  } catch (error) {
    next(error);
  }
};

// export const logout = async (req, res, next) => {
//   console.log("session", req.session);
//   res.clearCookie("access_token");
//   // req.session.destroy(function (err) {
//   //   req.logout();
//   // });
//   res.send("User has been logged out");
// };
