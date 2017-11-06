import React from 'react';

import { gql, graphql } from 'react-apollo';

import Page from 'components/Page';
import Container from 'components/Container';
import Item from 'components/Item';

import BoardItem from 'components/BoardItem';
import BoardDialogButton from 'components/BoardDialogButton';

const MainPage = ({ boardsData }) => {
  return (
    <Page>
      <Container>
        {boardsData &&
          boardsData.map(({ id, name, description }) => (
            <Item key={id}>
              <BoardItem name={name} description={description} />
            </Item>
          ))}

        <Item>
          <BoardDialogButton />
        </Item>
      </Container>
    </Page>
  );
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

export default graphql(ALL_BOARDS_QUERY, {
  props: ({ ownProps, data }) => {
    return {
      boardsData: data.allBoards,
    };
  },
})(MainPage);
