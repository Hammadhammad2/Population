import mongoose from "mongoose";
const citySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  id: String,
  label: String,
  lat: Number,
  lon: Number,
  placeId: String,
});

const City = new mongoose.model("City", citySchema);

export default City;
