import React from 'react';

import Grid from 'material-ui/Grid';

const Container = props => {
  return <Grid lg={3} md={4} sm={6} xs={12} {...props} item />;
};

export default Container;
