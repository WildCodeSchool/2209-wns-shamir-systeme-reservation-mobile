import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: process.env.API_URL,
});

// Middleware pour intercepter
const authLink = setContext(async(_, { headers }) => {
  // get token in localStore
  const token = await AsyncStorage.getItem("token");


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
