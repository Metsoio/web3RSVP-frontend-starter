import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/davidgarrote/poker_test",
  cache: new InMemoryCache(),
});

export default client;