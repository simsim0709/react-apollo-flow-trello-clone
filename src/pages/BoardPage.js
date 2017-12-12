// @flow

import React from 'react';

import { graphql, compose } from 'react-apollo';
import type { OperationComponent } from 'react-apollo';
import gql from 'graphql-tag';

import { withStyles } from 'material-ui/styles';

import Page from 'components/Page';

import Container from 'components/Container';
import Item from 'components/Item';

import List from 'components/List';
import ListCreateButton from 'components/ListCreateButton';

type ListData = Object;

type Response = {
  allLists: ListData[],
};

type InputProps = {
  boardId: string,
};

type ReturnProps = {
  lists: ?(ListData[]),
  boardId?: ?string,
};

type Props = { classes: Object } & ReturnProps;

const styles = theme => ({
  '@global': {
    main: {
      overflow: 'hidden',
    },
  },
  root: {
    overflowX: 'auto',
  },
  container: {
    flexWrap: 'nowrap',
    height: 'calc(100vh - 88px)',
  },
});

const BoardPage = ({ classes, boardId, lists }: Props) => {
  return (
    <Page className={classes.root}>
      <Container className={classes.container}>
        {lists &&
          lists.map((list: ListData) => (
            <Item>
              <List listData={list} />
            </Item>
          ))}
        <Item>
          <ListCreateButton boardId={boardId} />
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
      cards {
        id
        createdAt
        name
      }
    }
  }
`;

const withAllLists: OperationComponent<
  Response,
  InputProps,
  ReturnProps
> = graphql(ALL_LISTS_BY_BOARD_ID_QUERY, {
  skip: ({ match }) => match && match.params && !match.params.boardId,
  options: ({ match }) => {
    return {
      variables: {
        boardId: match.params.boardId,
      },
    };
  },
  props: ({ data, ownProps }) => {
    const { allLists } = data;
    const { match } = ownProps;

    return {
      lists: allLists,
      boardId: match && match.params && match.params.boardId,
    };
  },
});

export default compose(withStyles(styles), withAllLists)(BoardPage);
