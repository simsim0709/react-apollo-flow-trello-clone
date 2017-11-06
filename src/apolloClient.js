import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHCOOL_SIMPLE_API,
});

const client = new ApolloClient({ networkInterface });

export default client;
