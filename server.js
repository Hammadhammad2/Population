import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import resolvers from "./resolvers/resolvers.js";
import typeDefs from "./schema/schema.js";
import jwt from "jsonwebtoken";
import dbConnection from "./config/dbConnection.js";
const secret = "test";

const context = ({ req }) => {
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    const token = authorization;

    console.log(token);

    if (token) {
      const { id } = jwt.verify(token, secret);
      console.log(id);
      return { id };
    }
  } catch (error) {
    throw new Error("Sorry! You are not authorized to access this page");
  }
};

dbConnection;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
