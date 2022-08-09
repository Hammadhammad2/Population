import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = "test";
const resolvers = {
  Query: {
    users: async () => await User.find({}),
  },
  Mutation: {
    signUpUser: async (_, { newUser }) => {
      const { name, email, phoneno, password, confirmpassword } = newUser;

      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new Error("User Already Exists");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        name,
        email,
        phoneno,
        password: hashedPassword,
      });
      console.log("User created", result);
      return result;
    },
    SigninUser: async (_, { newSignInUser }) => {
      const { email, password } = newSignInUser;

      console.log(email,password)

      const oldUser = await User.findOne({ email: email });
      if (!oldUser) {
        throw new Error("User does not Exists");
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );
      if (!isPasswordCorrect) {
        throw new Error("Invalid Password");
      }

      const token = jwt.sign({ id: oldUser._id }, secret, {
        expiresIn: "2h",
      });
      console.log("Sign in Successful", token);
      return { token };
    },
  },
};
export default resolvers;
