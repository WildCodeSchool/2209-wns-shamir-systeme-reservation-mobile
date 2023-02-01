import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const {manifest} = Constants;

const httpLink = createHttpLink({
  uri: "http://192.168.1.60:5002",
});

// Middleware pour intercepter
const authLink = setContext((_, { headers }) => {
  // get token in localStore
  const token = AsyncStorage.getItem("token");

  // stock token in headers
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// init connection to back (with a link the middleware + httpLink)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
