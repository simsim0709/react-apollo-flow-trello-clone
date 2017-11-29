// @flow

import React from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import CardListItem from './CardListItem';

const styles = theme => {
  return {
    root: {
      background: theme.palette.grey[200],
    },
  };
};

const CardList = ({ classes, listData }) => {
  const { id, name } = listData;
  console.log('listData', listData);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
      <CardContent>
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
      </CardContent>
      <CardActions>
        <Button>Add a Card..</Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(CardList);
