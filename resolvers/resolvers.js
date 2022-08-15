import SignUpResolver from "./signUpResolver.js";
import deleteCityResolver from "./deleteCityResolver.js";
import addCity from "./addCity.js";
import signInResolver from "./signInResolver.js";
import getCitiesResolver from "./getCitiesResolver.js";

const resolvers = {
  Query: {
    getcities: getCitiesResolver,
  },
  Mutation: {
    signUpUser: SignUpResolver,
    SigninUser: signInResolver,
    addCity: addCity,
    deleteCities: deleteCityResolver,
  },
};

export default resolvers;
