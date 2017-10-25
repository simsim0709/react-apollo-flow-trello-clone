import React from 'react';

import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    minHeight: '100vh',
    padding: '0 16px',
  },
};

const Page = ({ classes, ...restProps }) => {
  return <div className={classes.root} {...restProps} />;
};

export default withStyles(styles)(Page);
