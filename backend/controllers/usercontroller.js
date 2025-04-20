import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.json({ success: false, messge: "User Not Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(user._id);
    response.json({ success: true, token });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerUser = async (request, response) => {
  const { name, email, password } = request.body;
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return response.json({ success: false, message: "Email Already Exist" });
    }

    if (!validator.isEmail(email)) {
      return response.json({ success: false, message: "Enter a Valid Email" });
    }

    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Enter Strong Password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    reponse.json({ success: true, token });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error });
  }
};
