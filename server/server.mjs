import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";

const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author
  }

  type Author {
    id: String,
    name: String
  }

  type Query{
    folders: [Folder]
  }
`;
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
  },
  // resolver child
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
  },
};

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
// Middleware
// prevent cors error
app.use(cors(), bodyParser.json(), expressMiddleware(server));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log("Server already at http://localhost:4000");
