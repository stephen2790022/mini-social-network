/* eslint-disable quote-props */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState();
  const cookie = Cookies.get('token');

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
        setCurrentUser(element);
      });
  };
  useEffect(() => {
    handleProfil();
  }, []);
  return (
    <div>
      {!currentUser && 'loading'}
      {currentUser && currentUser.username}
    </div>
  );
};

export default Profile;
