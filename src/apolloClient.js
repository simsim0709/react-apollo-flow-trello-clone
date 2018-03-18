import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from 'apollo-client-preset';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHCOOL_SIMPLE_API,
});

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphcoolToken');
  const authorizationHeader = token ? `Bearer ${token}` : null;

  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });

  return forward(operation);
});

const httpLinkWithAuthToken = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
});

export default client;
