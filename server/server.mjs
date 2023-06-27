import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import "./firebaseConfig.js";
import mongoose from "mongoose";
import "dotenv/config";
import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
import { getAuth } from "firebase-admin/auth";

// Firebase: Token will be refresh after 1 hour
// Other wise with JWT, we have create refresh token

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

const authorizationJWT = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];
    // Verify token from client to server
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((error) => {
        return res.status(403).json({
          message: "Forbidden",
          error: error,
        });
      });
  } else {
    next();
  }
};
// Middleware
// prevent cors error
app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      // tV8IBntwnFNN28hpWwMfHtmxOGi1
      return { uid: res.locals.uid };
    },
  })
);

// Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.q4lcpbv.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log("🚀 Server ready at http://localhost:4000");
  });
