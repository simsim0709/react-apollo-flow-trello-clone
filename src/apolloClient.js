import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHCOOL_SIMPLE_API }),
  cache: new InMemoryCache(),
});

export default client;
