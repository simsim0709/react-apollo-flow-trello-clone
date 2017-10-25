import React from 'react';

import Page from 'components/Page';
import Container from 'components/Container';
import Item from 'components/Item';

import BoardItem from 'components/BoardItem';

const MainPage = () => {
  return (
    <Page>
      <Container>
        <Item>
          <BoardItem />
        </Item>
        <Item>
          <BoardItem />
        </Item>
        <Item>
          <BoardItem />
        </Item>
        <Item>
          <BoardItem />
        </Item>
        <Item>
          <BoardItem />
        </Item>
        <Item>
          <BoardItem />
        </Item>
        <Item>
          <BoardItem />
        </Item>
      </Container>
    </Page>
  );
};

export default MainPage;
