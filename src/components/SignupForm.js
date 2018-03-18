import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import withCurrentUser from 'hocs/withCurrentUser';

class CreateUser extends React.Component {
  constructor(props) {
    super();

    this.state = {
      email: '',
      password: '',
      name: '',
      emailSubscription: false,
    };
  }

  render() {
    if (this.props.currentUser.isLoggedIn) {
      console.warn('Already logged in');
      this.props.onSignup(new Error('already logged in'));
    }

    return (
      <form onSubmit={this.signupUser}>
        <TextField
          value={this.state.email}
          label="Email"
          margin="normal"
          fullWidth
          onChange={e => this.setState({ email: e.target.value })}
        />
        <TextField
          value={this.state.password}
          type="password"
          label="Password"
          margin="normal"
          fullWidth
          placeholder="Password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <TextField
          value={this.state.name}
          label="Name"
          margin="normal"
          fullWidth
          onChange={e => this.setState({ name: e.target.value })}
        />

        <Button onClick={this.signupUser}>Sign up</Button>
      </form>
    );
  }

  signupUser = async event => {
    event.preventDefault();

    const { email, password, name } = this.state;

    try {
      const user = await this.props.signupUserMutation({
        variables: { email, password, name },
      });
      localStorage.setItem('graphcoolToken', user.data.signupUser.token);

      this.props.onSignup(null);
    } catch (e) {
      console.error(`An error occured: `, e);
      this.props.onSignup(e);
    }
  };
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation(
    $email: String!
    $password: String!
    $name: String
  ) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`;

export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
  withCurrentUser
)(withRouter(CreateUser));
