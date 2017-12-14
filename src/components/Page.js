import React from 'react';

import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '0 16px',
  },
};

const Page = ({ classes, className, ...restProps }) => {
  const classNames = className ? `${classes.root} ${className}` : classes.root;
  return <div className={classNames} {...restProps} />;
};

export default withStyles(styles)(Page);
