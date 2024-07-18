import { buildSchema } from "drizzle-graphql";
import { createYoga } from "graphql-yoga";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { db } from "../db";
import { NextRequest } from "next/server";

const { schema } = buildSchema(db);
const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: {
    Request,
    Response,
  },
});

export default handleRequest;

// const server = new ApolloServer({ schema });

// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//   context: async (req) => ({ req }),
// });

// export default handler;

// const {url} = startStandaloneServer(server, {port: 4000});
