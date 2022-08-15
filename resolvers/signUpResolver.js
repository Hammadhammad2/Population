import User from "../models/user.js";
import bcrypt from "bcryptjs";

const SignUpResolver = async (_, { newUser }) => {
  const { name, email, phoneno, password } = newUser;

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
};

export default SignUpResolver;
