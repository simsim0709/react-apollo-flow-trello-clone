import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  wrapper: {
    paddingRight: theme.spacing.unit,
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: theme.spacing.unit * 2,
  },
  formTextField: {
    width: '100%',
  },
  formButton: {
    marginLeft: theme.spacing.unit,
  },
});

class ListCreateButton extends Component {
  state = {
    open: false,
    name: '',
  };

  handlePopover = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.handlePopover();

    const { mutate, boardId } = this.props;

    try {
      const result = mutate({
        variables: {
          boardId,
          name: this.state.name,
        },
      });

      console.log('result', result);
    } catch (error) {
      console.error('error', error);
    }
  };

  handleTextChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  anchorEl() {
    return ReactDOM.findDOMNode(this.button);
  }

  getButtonWidth() {
    const buttonRect =
      this.anchorEl() && this.anchorEl().getBoundingClientRect();

    return buttonRect && buttonRect.width;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Button
          variant="raised"
          color="primary"
          style={{ width: '100%' }}
          onClick={this.handlePopover}
          ref={button => (this.button = button)}>
          Add a list...
        </Button>
        <Popover
          open={this.state.open}
          anchorEl={this.anchorEl()}
          onClose={this.handlePopover}>
          <form
            className={classes.form}
            style={{
              width: this.getButtonWidth() - 32, // 32 is margin left and right
            }}
            onSubmit={this.handleSubmit}>
            <TextField
              label="Add a list ..."
              className={classes.formTextField}
              onChange={this.handleTextChange}
              value={this.state.name}
              autoFocus
            />
            <Button
              variant="raised"
              type="submit"
              raised
              color="secondary"
              className={classes.formButton}>
              Save
            </Button>
          </form>
        </Popover>
      </div>
    );
  }
}

const CREATE_LIST_MUTATION = gql`
  mutation CreateListMutation($boardId: ID!, $name: String) {
    createList(boardId: $boardId, name: $name) {
      id
    }
  }
`;

export default compose(
  withStyles(styles),
  graphql(CREATE_LIST_MUTATION, {
    options: {
      refetchQueries: ['AllListsByBoardIdQuery'],
    },
  })
)(ListCreateButton);
