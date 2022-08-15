import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = "test";

const signInResolver = async (_, { newSignInUser }) => {
  const { email, password } = newSignInUser;

  //console.log(email, password);

  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    throw new Error("User does not Exists");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Password");
  }

  const userId = user._id;
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: "2h",
  });
  console.log("Sign in Successful");
  return { userId, token };
};

export default signInResolver;
