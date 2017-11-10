// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    minWidth: 160,
    height: 100,
  },
  body1: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

const BoardItem = ({ classes, name, description }) => {
  return (
    <Card className={classes.card}>
      <Link to="/board/1">
        <CardContent>
          <Typography type="headline" component="h2">
            {name}
          </Typography>
          <Typography type="body1" className={classes.body1}>
            {description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default withStyles(styles)(BoardItem);
