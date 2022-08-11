import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import jwt_decode from "jwt-decode";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.js";
import jwt from "jsonwebtoken";
import dbConnection from "./config/dbConnection.js";
const secret = "test";

const context = ({ req }) => {
  const { authorization } = req.headers;

  if (authorization) {
    const { id } = jwt.verify(authorization, secret);

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
