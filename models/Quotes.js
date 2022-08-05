import mongoose from "mongoose";
const qouteSchema = new mongoose.Schema({
  name: String,
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
mongoose.model("Qoute", userSchema);
