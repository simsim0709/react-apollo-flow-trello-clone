import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { withStyles } from 'material-ui/styles';

import Page from 'components/Page';

import Container from 'components/Container';
import Item from 'components/Item';

import List from 'components/List';
import ListCreateButton from 'components/ListCreateButton';

const styles = theme => ({
  page: {
    width: '100%',
    height: '100vh',
    padding: '0 16px',
    overflowX: 'scroll',
    boxSizing: 'border-box',
  },
  container: {
    flexWrap: 'nowrap',
  },
});

const BoardPage = ({ classes, match, lists }) => {
  const { params } = match;

  console.log('lists', lists);

  return (
    <Page className={classes.page}>
      <Container className={classes.container}>
        {lists &&
          lists.map(list => (
            <Item>
              <List listData={list} />
            </Item>
          ))}
        <Item>
          <ListCreateButton boardId={params && params.boardId} />
        </Item>
      </Container>
    </Page>
  );
};

const ALL_LISTS_BY_BOARD_ID_QUERY = gql`
  query AllListsByBoardIdQuery($boardId: ID) {
    allLists(filter: { board: { id: $boardId } }) {
      id
      name
    }
  }
`;

export default compose(
  withStyles(styles),
  graphql(ALL_LISTS_BY_BOARD_ID_QUERY, {
    skip: ({ match }) => match && match.params && !match.params.boardId,
    options: ({ match }) => {
      return {
        variables: {
          boardId: match.params.boardId,
        },
      };
    },
    props: ({ data }) => {
      const { allLists } = data;

      return {
        lists: allLists,
      };
    },
  })
)(BoardPage);
