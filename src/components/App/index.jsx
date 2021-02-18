/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from 'pages/Home';
import NavBar from 'components/NavBar';
import Register from 'pages/Register';
import LogIn from 'pages/LogIn';
import Profile from 'pages/Profile';
import User from 'pages/User';

const App = () => {
  const isLogged = useSelector((state) => state.checked);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      )}
    />
  );
  return (
    <Router>
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
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/user/:id">
          <User />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
