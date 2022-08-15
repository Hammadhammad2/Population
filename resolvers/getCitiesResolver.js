import City from "../models/City.js";

const getCitiesResolver = async (_, { userID }, { id }) => {
  if (!id) {
    throw new Error("Your are not authorized to perform this action");
  }
  const result = await City.find({ userId: userID });

  return result;
};

export default getCitiesResolver;
