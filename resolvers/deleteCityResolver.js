import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import City from "../models/City.js";

const deleteCityResolver = async (_, { cityId }, { id }) => {
  if (!id) {
    throw new Error("Your are not authorized to perform this action");
  }

  const result = await City.findByIdAndRemove(cityId);

  return result;
};

export default deleteCityResolver;
