import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from 'components/Header';

import MainPage from 'pages/MainPage';
import BoardPage from 'pages/BoardPage';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/board/:boardId" component={BoardPage} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
