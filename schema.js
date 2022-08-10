import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Token {
    token: String
  }

  type Mutation {
    signUpUser(newUser: UserInput): User
    SigninUser(newSignInUser: UserSigninInput): Token
    addCity(newCity: CityInput): City
  }

  type User {
    _id: ID
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
    id: String
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
