import mongoose from "mongoose";
const citySchema = mongoose.Schema({
  userId: String,
  id: String,
  label: String,
  lat: Number,
  lon: Number,
  placeId: String,
});

const City = new mongoose.model("City", citySchema);

export default City;
