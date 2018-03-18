import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      name
      email
    }
  }
`;

export default WrappedComponent =>
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' },
    props({ loggedInUserQuery }) {
      const { loggedInUser = {} } = loggedInUserQuery;

      return {
        currentUser: {
          isLoggedIn: loggedInUser.id,
          ...loggedInUser,
        },
      };
    },
  })(WrappedComponent);
