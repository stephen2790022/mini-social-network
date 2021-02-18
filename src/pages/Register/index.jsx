import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// eslint-disable-next-line import/no-unresolved
import { isChecked, fetchNewsFailure, getCurrentUserId } from 'redux/actions';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const registrationFetch = (e) => {
    e.preventDefault();
    const data = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };
    console.log(e.target);
    fetch('http://localhost:1337/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((element) => {
        if (element.status === 'error') {
          dispatch(fetchNewsFailure(element.message));
        } else {
          console.log(element);
          Cookies.set('token', element.jwt);
          const cookie = Cookies.set('userId', element.user.id);
          dispatch(getCurrentUserId(cookie));
          dispatch(isChecked());
          history.push('/');
        }
      });
  };
  return (
    <form onSubmit={registrationFetch}>
      <label htmlFor="name">
        Nom :
        <input type="text" name="name" id="userName" onChange={(event) => setUserName(event.target.value)} />
      </label>
      <label htmlFor="email">
        email :
        <input type="email" name="email" onChange={(event) => setUserEmail(event.target.value)} />
      </label>
      <label htmlFor="password">
        password :
        <input type="password" name="password" onChange={(event) => setUserPassword(event.target.value)} />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default Register;
