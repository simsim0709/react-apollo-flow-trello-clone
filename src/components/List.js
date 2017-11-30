// @flow

import React from 'react';

import { withStyles } from 'material-ui/styles';
import MUICard, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import Card from './Card';

const styles = theme => {
  return {
    root: {
      background: theme.palette.grey[200],
    },
  };
};

const List = ({ classes, listData }) => {
  const { id, name } = listData;
  console.log('listData', listData);
  return (
    <MUICard className={classes.root}>
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
      <CardContent>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardContent>
      <CardActions>
        <Button>Add a Card..</Button>
      </CardActions>
    </MUICard>
  );
};

export default withStyles(styles)(List);
