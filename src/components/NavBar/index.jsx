/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unCheck } from 'redux/actions';
import Cookies from 'js-cookie';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLog = useSelector((state) => state.checked);
  const handleLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    dispatch(unCheck());
    history.push('/');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Log In</Link>
      <Link to="/profile">My profil</Link>
      {isLog && <button onClick={handleLogOut}>Log Out</button>}
    </div>
  );
};
export default NavBar;
