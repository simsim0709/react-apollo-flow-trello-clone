import React, { Fragment } from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';

import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';

import withCurrentUser from 'hocs/withCurrentUser';

class LoginButton extends React.Component {
  state = {
    open: false,
    value: 0,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    const { currentUser } = this.props;

    if (currentUser.isLoggedIn) {
      localStorage.removeItem('graphcoolToken');
      window.location.reload();
    } else {
      this.setState({ open: true });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleAuth(error) {
    if (error) {
      alert('Sorry, there is an error, try again');
    } else {
      window.location.reload();
    }
  }

  render() {
    const { currentUser, ...restProps } = this.props;

    return (
      <Fragment>
        <Button {...restProps} onClick={this.handleClick}>
          {currentUser.isLoggedIn ? currentUser.name : 'Login'}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="login" />
            <Tab label="sign up" />
          </Tabs>
          <DialogContent>
            {this.state.value === 0 && <LoginForm onLogin={this.handleAuth} />}
            {this.state.value === 1 && (
              <SignupForm onSignup={this.handleAuth} />
            )}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withCurrentUser(LoginButton);
