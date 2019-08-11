import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { RegisterResolver } from "./modules/user/register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/login";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver,LoginResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();
  const RedisStore = connectRedis(session);

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis as any
    }),
    name: "qid",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
  };

  app.use(cors());
  app.use(session(sessionOption));

  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}/graphql`);
  });
};

startServer();
