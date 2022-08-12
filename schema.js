import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    getcities(userID: String): [City]
  }

  type Token {
    token: String
    userId: String
  }

  type Mutation {
    signUpUser(newUser: UserInput): User
    SigninUser(newSignInUser: UserSigninInput): Token
    addCity(newCity: CityInput): City
    deleteCities(cityId: String): City
  }

  type User {
    name: String
    email: String!
    phoneno: String
    password: String!
    confirmpassword: String
  }
  input UserInput {
    name: String
    email: String
    phoneno: String
    password: String
    confirmpassword: String
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  type City {
    _id: ID
    userId: String
    label: String
    lat: Float
    lon: Float
    placeId: String
  }

  input CityInput {
    userId: String
    label: String
    lat: Float
    lon: Float
    placeId: String
  }
`;
export default typeDefs;
