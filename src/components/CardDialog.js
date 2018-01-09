import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import Markdown from 'react-markdown';

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = {
  dialog: {
    width: '80vw',
    height: '90vh',
  },
  description: {
    marginBottom: 8,
  },
  descriptionCaptionText: {
    padding: '16px 4px',
    '&:hover': {
      background: 'rgba(0, 0, 0, .14)',
    },
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
};

class CardDialog extends React.Component {
  state = {
    isEditingName: false,
    editedName: '',
    isEditingContent: false,
    editedContent: '',
  };

  componentWillReceiveProps({ cardData }) {
    if (
      cardData &&
      cardData.name !== (this.props.cardData && this.props.cardData.name)
    ) {
      this.setState({
        editedName: cardData.name,
      });
    }

    if (
      cardData &&
      cardData.content !== (this.props.cardData && this.props.cardData.content)
    ) {
      this.setState({
        editedContent: cardData.content,
      });
    }
  }

  handleNameClick = event => {
    event.preventDefault();

    this.setState({
      isEditingName: true,
    });
  };

  handleNameChange = event => {
    event.preventDefault();

    this.setState({
      editedName: event.target.value,
    });
  };

  handleNameKeyPress = event => {
    if (event.key === 'Enter') {
      const { cardId, updateCardName } = this.props;

      updateCardName({
        variables: {
          id: cardId,
          name: this.state.editedName,
        },
      });

      this.setState({
        isEditingName: false,
      });
    }
  };

  handleNameBlur = event => {
    this.setState({
      isEditingName: false,
    });
  };

  handleContentClick = event => {
    event.preventDefault();

    this.setState({
      isEditingContent: true,
    });
  };

  handleContentChange = event => {
    event.preventDefault();

    this.setState({
      editedContent: event.target.value,
    });
  };

  handleSaveClick = event => {
    const { cardId, updateCardContent } = this.props;

    updateCardContent({
      variables: {
        id: cardId,
        content: this.state.editedContent,
      },
    });

    this.setState({
      isEditingContent: false,
    });
  };

  handleContentBlur = event => {
    this.setState({
      isEditingContent: false,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.props.onClose();
  };

  renderTransition() {
    return <Slide direction="down" />;
  }

  renderMarkdown() {
    if (!this.state.editedContent) {
      return (
        <Typography
          className={this.props.classes.descriptionCaptionText}
          type="body1">
          Add description ...
        </Typography>
      );
    }

    return <Markdown source={this.state.editedContent} />;
  }

  render() {
    const { isEditingName, editedName } = this.state;
    const { cardData = {}, classes } = this.props;
    const { name } = cardData;

    return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={this.props.open}
        keepMounted
        onRequestClose={this.handleRequestClose}>
        <DialogTitle onClick={this.handleNameClick}>
          {isEditingName ? (
            <TextField
              fullWidth
              autoFocus
              value={editedName}
              onChange={this.handleNameChange}
              onKeyPress={this.handleNameKeyPress}
              onBlur={this.handleNameBlur}
            />
          ) : (
            name
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText onClick={this.handleContentClick}>
            {this.state.isEditingContent ? (
              <Fragment>
                <TextField
                  fullWidth
                  autoFocus
                  multiline
                  rows="4"
                  placeholder="Add description ..."
                  className={classes.description}
                  value={this.state.editedContent}
                  onChange={this.handleContentChange}
                  onBlur={this.handleContentBlur}
                />
                <div className={classes.buttonWrapper}>
                  <Button raised color="accent" onClick={this.handleSaveClick}>
                    SAVE
                  </Button>
                  <IconButton>
                    <CloseIcon onClick={this.handleOpen} />
                  </IconButton>
                </div>
              </Fragment>
            ) : (
              this.renderMarkdown()
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const CARD_VIEW_QUERY = gql`
  query CardViewQuery($id: ID!) {
    Card(id: $id) {
      id
      name
      content
    }
  }
`;

const CARD_NAME_MUTATION = gql`
  mutation CardNameMutation($id: ID!, $name: String!) {
    updateCard(id: $id, name: $name) {
      id
      name
    }
  }
`;

const CARD_CONTENT_MUTATION = gql`
  mutation CardContentMutation($id: ID!, $content: String!) {
    updateCard(id: $id, content: $content) {
      id
      content
    }
  }
`;

export default compose(
  withStyles(styles),
  graphql(CARD_VIEW_QUERY, {
    skip: ({ cardId }) => !cardId,
    options: ({ cardId }) => {
      return {
        variables: {
          id: cardId,
        },
      };
    },
    props: ({ data: { Card } }) => {
      return {
        cardData: Card,
      };
    },
  }),
  graphql(CARD_NAME_MUTATION, {
    name: 'updateCardName',
  }),
  graphql(CARD_CONTENT_MUTATION, {
    name: 'updateCardContent',
  })
)(CardDialog);
