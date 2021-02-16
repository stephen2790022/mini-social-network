/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unCheck } from 'redux/actions';
import Cookies from 'js-cookie';

const NavBar = () => {
  const check = useSelector((state) => state.checked);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    dispatch(unCheck());
    history.push('/home');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Log In</Link>
      <Link to="/profile">My profil</Link>
      <Link to="/newpost">New Post</Link>
      {check && <button onClick={handleLogOut}>Log Out</button>}
    </div>
  );
};
export default NavBar;
