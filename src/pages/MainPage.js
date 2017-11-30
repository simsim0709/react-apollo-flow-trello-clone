// @flow

import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Page from 'components/Page';
import Container from 'components/Container';
import Item from 'components/Item';

import BoardCard from 'components/BoardCard';
import BoardCreateButton from 'components/BoardCreateButton';

import type { OperationComponent } from 'react-apollo';

type Board = {|
  id: string,
  name: string,
  description?: string,
|};

type Response = {
  allBoards: Board[],
};

type Props = {
  boardsData: ?(Board[]),
};

const MainPage = ({ boardsData }: Props) => {
  return (
    <Page>
      <Container>
        {boardsData &&
          boardsData.map(({ id, name, description }) => (
            <Item key={id}>
              <BoardCard boardId={id} name={name} description={description} />
            </Item>
          ))}

        <Item>
          <BoardCreateButton />
        </Item>
      </Container>
    </Page>
  );
};

MainPage.defaultProps = {
  boardsData: [],
};

const ALL_BOARDS_QUERY = gql`
  query AllBoardsQuery {
    allBoards {
      id
      name
      description
    }
  }
`;

const withAllBoards: OperationComponent<Response, {}, Props> = graphql(
  ALL_BOARDS_QUERY,
  {
    props: ({ ownProps, data }) => {
      return {
        boardsData: data.allBoards,
      };
    },
  }
);

export default withAllBoards(MainPage);
