/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from 'pages/Home';
import NavBar from 'components/NavBar';
import Register from 'pages/Register';
import LogIn from 'pages/LogIn';
import Profile from 'pages/Profile';
import Post from 'pages/Post';
import { store } from 'redux/store';

const App = () => (
  <Router>
    <Provider store={store}>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/newpost">
          <Post />
        </Route>
      </Switch>
    </Provider>
  </Router>
);
ReactDOM.render(<App />, document.getElementById('root'));
