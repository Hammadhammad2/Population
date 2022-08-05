import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  phoneno: String,
  password: {
    type: String,
    required: true,
  },
});
const User = new mongoose.model("User", userSchema);
export default User;
