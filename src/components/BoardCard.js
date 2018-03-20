// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import { Link } from 'react-router-dom';

type Props = {
  classes: Object,
  boardId: string,
  name: string,
  description?: string,
};

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

const BoardCard = ({ classes, boardId, name, description }: Props) => {
  return (
    <Card className={classes.card}>
      <Link to={`/board/${boardId}`}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {name}
          </Typography>
          <Typography variant="body1" className={classes.body1}>
            {description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default withStyles(styles)(BoardCard);
