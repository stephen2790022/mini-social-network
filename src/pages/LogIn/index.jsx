/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { isChecked, fetchNewsFailure } from 'redux/actions';
import { useHistory } from "react-router-dom";

const LogIn = () => {
  const [userPassword, setUserPassword] = useState();
  const [userEmail, setUserEmail] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const data = {
    identifier: userEmail,
    password: userPassword,
  };

  const logInFetch = (e) => {
    e.preventDefault();
    fetch('http://localhost:1337/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((element) => {
        if (element.error) {
          dispatch(fetchNewsFailure(element.message));
        } else {
          Cookies.set('token', element.jwt);
          Cookies.set('userId', element.user.id);
          dispatch(isChecked());
          history.push('/home');
        }
      });
  };
  return (
    <form onSubmit={logInFetch}>
      <label>
        email :
        <input type="email" name="email" onChange={(event) => setUserEmail(event.target.value)} />
      </label>
      <label>
        password :
        <input type="password" name="password" onChange={(event) => setUserPassword(event.target.value)} />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default LogIn;
