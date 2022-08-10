import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.js";
import jwt from "jsonwebtoken";
import dbConnection from "./config/dbConnection.js";
const secret = "test";

const context = ({ req }) => {
  const { authorization } = req.headers;

  if (authorization) {
    const { id } = jwt.verify(authorization, secret);
    console.log(id);
    return { id };
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
