import React from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 160,
    height: 100,
    background: theme.palette.primary[500],
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
});

class BoardCreateButton extends React.Component {
  state = {
    open: false,
    name: '',
    description: '',
  };

  handleDialog = () => {
    this.setState(({ open }) => ({ open: !open, name: '', description: '' }));
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async () => {
    try {
      const result = await this.props.createBoard({
        variables: {
          name: this.state.name,
          description: this.state.description,
        },
      });

      console.log('result', result);
    } catch (error) {
      console.error('error', error);
    }

    this.handleDialog();
  };

  render() {
    const { classes } = this.props;

    return [
      <Card onClick={this.handleDialog} className={classes.card}>
        <CardContent>
          <Typography type="subheading" color="inherit">
            Create new board...
          </Typography>
        </CardContent>
      </Card>,
      <Dialog open={this.state.open} onRequestClose={this.handleDialog}>
        <DialogTitle>New Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new board, please enter board name and description. Then,
            press OK button.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="New Board Name ..."
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Borad Description ..."
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialog}>Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>,
    ];
  }
}

const CREATE_BOARD_MUTATION = gql`
  mutation CreateBoard($name: String!, $description: String) {
    createBoard(name: $name, description: $description) {
      id
      name
    }
  }
`;

const withCreateBoard = graphql(CREATE_BOARD_MUTATION, {
  name: 'createBoard',
  options: {
    refetchQueries: ['AllBoardsQuery'],
  },
});

export default compose(withStyles(styles), withCreateBoard)(BoardCreateButton);
