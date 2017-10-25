import React from 'react';

import { withStyles } from 'material-ui/styles';

import Page from 'components/Page';

import Container from 'components/Container';
import Item from 'components/Item';

import CardList from 'components/CardList';

const styles = theme => ({
  page: {
    width: '100%',
    height: '100vh',
    padding: '0 16px',
    overflowX: 'scroll',
  },
  container: {
    flexWrap: 'nowrap',
  },
});

const BoardPage = ({ classes }) => {
  return (
    <Page className={classes.page}>
      <Container className={classes.container}>
        <Item>
          <CardList />
        </Item>
        <Item>
          <CardList />
        </Item>
        <Item>
          <CardList />
        </Item>
        <Item>
          <CardList />
        </Item>
        <Item>
          <CardList />
        </Item>
      </Container>
    </Page>
  );
};

export default withStyles(styles)(BoardPage);
