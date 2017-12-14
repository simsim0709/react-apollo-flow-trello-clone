import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { withStyles } from 'material-ui';

import Header from 'components/Header';

import MainPage from 'pages/MainPage';
import BoardPage from 'pages/BoardPage';

import apolloClient from './apolloClient';

import './App.css';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
};

const App = ({ classes }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <main className={classes.root}>
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

export default withStyles(styles)(App);
