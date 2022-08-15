import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import City from "../models/City.js";

const addCity = async (_, { newCity }, { id }) => {
  if (!id) {
    throw new Error("Your are not authorized to perform this action");
  }

  const old = await City.findOne({
    placeId: newCity.placeId,
    userId: newCity.userId,
  });

  if (old) {
    throw new Error(" CITY ALREADY EXISTS");
  } else {
    const result = await City.create(newCity);
    return result;
  }
};

export default addCity;
