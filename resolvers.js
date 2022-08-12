import User from "./models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import City from "./models/City.js";

const secret = "test";
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    getcities: async (_, { userID }) => {
      console.log(userID);
      const result = await City.find({ userId: userID });

      return result;
    },
  },
  Mutation: {
    signUpUser: async (_, { newUser }) => {
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
    },
    SigninUser: async (_, { newSignInUser }) => {
      const { email, password } = newSignInUser;

      //console.log(email, password);

      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        throw new Error("User does not Exists");
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error("Invalid Password");
      }

      const userId = user._id;
      const token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "2h",
      });
      console.log("Sign in Successful", token);
      return { userId, token };
    },

    addCity: async (_, { newCity }, { id }) => {
      if (!id) {
        throw new Error("Your are not authorized to perform this action");
      }

      //checkCity validation

      console.log(newCity);
      async function checkCity(newCity) {
        const old = await City.findOne({
          placeId: newCity.placeId,
          userId: newCity.userId,
        });

        if (old) {
          return false;
        } else {
          return true;
        }
      }

      //insertCity in db
      async function insertCity(newCity) {
        const result = await City.create(newCity);
        return result;
      }

      if (Array.isArray(newCity)) {
        var notAddedCities = [];
        var cities = newCity;
        await Promise.all(
          cities.map(async (newCity) => {
            await checkCity(newCity).then((resp) => {
              if (resp) {
                insertCity(newCity);
              } else {
                notAddedCities.push(newCity);
              }
            });
          })
        );

        //already added cities handler

        if (notAddedCities.length > 0) {
          return { notAddedCities, message: "Some Cities not added" };
        } else {
          return { message: "All cities added" };
        }
      } else {
        //add city to db

        const city = newCity;
        return checkCity(city).then((resp) => {
          if (resp) {
            insertCity(city)
              .then((result) => {
                console.log("newResponse====", result);
                return result;
              })
              .catch((err) => {
                console.log(err);
                throw new Error("Some Thing went Wrong");
              });
          } else {
            throw new Error(" CITY ALREADY EXISTS");
          }
        });
      }
    },
    deleteCities: async (_, { cityId }) => {
      console.log(cityId);

      const result = await City.findByIdAndRemove(cityId);

      return result;
    },
  },
};
export default resolvers;
