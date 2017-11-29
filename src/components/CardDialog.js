import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

const styles = {
  dialog: {
    width: '80vw',
    height: '90vh',
  },
};

class CardDialog extends React.Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={this.props.open}
        keepMounted
        onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>Card Title</DialogTitle>
        <DialogContent>
          <DialogContentText>Card Text</DialogContentText>
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

export default withStyles(styles)(CardDialog);
