/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable quote-props */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsFailure, userInfo } from 'redux/actions';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState();
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const infoUser = useSelector((state) => state.info);
  const cookie = Cookies.get('token');
  const dispatch = useDispatch();

  const handleProfil = () => {
    fetch('http://localhost:1337/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((element) => {
        dispatch(userInfo(element.username));
      });
  };
  useEffect(() => {
    handleProfil();
  }, [currentUser]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      username: userName,
      description: userDescription,
    };
    fetch('http://localhost:1337/users/me', {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((element) => {
        if (element.status === 'error') {
          dispatch(fetchNewsFailure(element.message));
        } else {
          setCurrentUser(element.username);
        }
      });
  };
  return (
    <div>
      {infoUser && infoUser}
      <h2>Update your Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>
          name :
          <input type="text" name="name" value={userName} onChange={(event) => setUserName(event.target.value)} />
        </label>
        <label>
          description :
          <input type="text" name="description" value={userDescription} onChange={(event) => setUserDescription(event.target.value)} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default Profile;
