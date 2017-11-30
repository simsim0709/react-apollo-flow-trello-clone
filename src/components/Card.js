// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import MUICard, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import CardDialog from './CardDialog';

type Props = {
  classes: Object,
};

type State = {
  open: boolean,
};

const styles = theme => ({
  card: {
    minWidth: 160,
    margin: '0 0 8px',
    cursor: 'pointer',
  },
  cardContent: {
    padding: '16px 16px 0',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  pos: {
    color: theme.palette.text.secondary,
  },
});

class Card extends React.Component<Props, State> {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;

    return [
      <MUICard
        className={classes.card}
        onClick={() => this.setState({ open: true })}
      >
        <CardContent className={classes.cardContent}>
          <Typography type="headline">title</Typography>
          <Typography type="body1" className={classes.pos}>
            createdAt
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Avatar>A</Avatar>
        </CardActions>
      </MUICard>,
      <CardDialog
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
      />,
    ];
  }
}

export default withStyles(styles)(Card);
