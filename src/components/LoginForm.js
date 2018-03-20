import React from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import withCurrentUser from 'hocs/withCurrentUser';

class CreateLogin extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    if (this.props.currentUser.id) {
      console.warn('already logged in');

      this.props.onLogin(new Error('already logged in'));
    }

    return (
      <form onSubmit={this.authenticateUser}>
        <TextField
          value={this.state.email}
          label="Email"
          margin="normal"
          fullWidth
          onChange={e => this.setState({ email: e.target.value })}
        />
        <TextField
          type="password"
          value={this.state.password}
          label="Password"
          margin="normal"
          fullWidth
          onChange={e => this.setState({ password: e.target.value })}
        />

        <Button onClick={this.authenticateUser}>Login</Button>
      </form>
    );
  }

  authenticateUser = async event => {
    event.preventDefault();

    try {
      const { email, password } = this.state;

      const response = await this.props.authenticateUserMutation({
        variables: { email, password },
      });
      localStorage.setItem(
        'graphcoolToken',
        response.data.authenticateUser.token
      );

      this.props.onLogin(null);
    } catch (e) {
      console.error(`An error occured: `, e);
      this.props.onLogin(e);
    }
  };
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;

export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' }),
  withCurrentUser
)(withRouter(CreateLogin));
