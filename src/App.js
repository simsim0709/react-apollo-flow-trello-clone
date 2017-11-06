import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from 'components/Header';

import MainPage from 'pages/MainPage';
import BoardPage from 'pages/BoardPage';

import apolloClient from './apolloClient';

import './App.css';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <main>
          <Header />
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/board/:boardId" component={BoardPage} />
          </Switch>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
