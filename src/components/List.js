// @flow

import React from 'react';

import { withStyles } from 'material-ui/styles';
import MUICard, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Card from './Card';

type Props = {
  classes: Object,
  listData?: ?Object,
};

type State = {
  open: boolean,
  name: ?string,
};

const styles = theme => {
  return {
    root: {
      background: theme.palette.grey[200],
      height: 'auto',
      boxSizing: 'border-box',
    },
    cardListWrapper: {
      paddingTop: 0,
      paddingBottom: 0,
      maxHeight: 'calc(100vh - 200px)',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    cardCreateButtonWrapper: {
      padding: 0,
      paddingBottom: '0 !important',
    },
    cardCreateButton: {
      width: '100%',
      textAlign: 'center',
    },
  };
};

class List extends React.Component<Props, State> {
  state = {
    open: false,
    name: '',
  };

  handleOpen = () => {
    this.setState(({ open, name }) => ({
      open: !open,
      name: !open ? '' : name, // clear name, if open state is false,
    }));
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const { listData: { id: listId } = {} } = this.props;
      const result = await this.props.mutate(
        {
          variables: {
            listId,
            name: this.state.name,
          },
          refetchQueries: ['AllListsByBoardIdQuery'],
        },
        this.clearInput
      );

      console.log('result', result);
    } catch (error) {
      console.error('error', error);
    }

    this.handleOpen();
  };

  clearInput() {
    this.setState({ name: '' });
  }

  render() {
    const { classes, listData } = this.props;
    const { name, cards: cardsData = [] } = listData;

    return (
      <MUICard className={classes.root}>
        <CardContent>
          <Typography variant="headline">{name}</Typography>
        </CardContent>
        <CardContent className={classes.cardListWrapper}>
          {cardsData.map((cardData = {}) => <Card {...cardData} />)}

          {this.state.open && (
            <MUICard className={classes.card}>
              <form onSubmit={this.handleSubmit}>
                <CardContent className={classes.cardContent}>
                  <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="New Card Name ..."
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleSubmit}>
                    Add
                  </Button>
                  <IconButton>
                    <CloseIcon onClick={this.handleOpen} />
                  </IconButton>
                </CardActions>
              </form>
            </MUICard>
          )}
        </CardContent>
        <CardContent className={classes.cardCreateButtonWrapper}>
          <Button
            className={classes.cardCreateButton}
            onClick={this.handleOpen}>
            Add a card...
          </Button>
        </CardContent>
      </MUICard>
    );
  }
}

const CREATE_CARD_MUTATION = gql`
  mutation CreateCardMutation($listId: ID!, $name: String!) {
    createCard(listId: $listId, name: $name) {
      id
    }
  }
`;

const withCreateCard = graphql(CREATE_CARD_MUTATION);

export default compose(withStyles(styles), withCreateCard)(List);
