import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";
import mongoose from "mongoose";

const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String,
    content: String,
  }

  type Author {
    id: String,
    name: String
  }

  type Query{
    folders: [Folder],
    folder(folderId: String): Folder,
    note(noteId: String): Note
  }
`;
const resolvers = {
  Query: {
    // All folders
    folders: () => {
      return fakeData.folders;
    },
    // Get each folder by folder ID
    folder: (parant, args) => {
      const folderId = args.folderId;
      return fakeData.folders.find((folder) => folder.id === folderId);
    },
    // Get note by noteId
    note: (parant, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  // resolver child
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    // Parent: folder is selected
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
};

const app = express();
const httpServer = http.createServer(app);
// mongoose.set('strictQuery', false);
// mongoose
//   .connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     console.log('Connected to DB');
//     await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
//     console.log('🚀 Server ready at http://localhost:4000');
//   });

// Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jpmynmq.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
// Middleware
// prevent cors error
app.use(cors(), bodyParser.json(), expressMiddleware(server));
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log("Server already at http://localhost:4000");
