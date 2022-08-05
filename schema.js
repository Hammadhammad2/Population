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
    signInUser(newSignInUser: UserSignINInput): Token
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

  input UserSignINInput {
    email: String!

    password: String!
  }

  type Quote {
    name: String
    by: ID
  }
`;
export default typeDefs;