/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchNewsFailure } from 'redux/actions';
import { useDispatch } from 'react-redux';

const User = () => {
  const cookie = Cookies.get('token');
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [userPost, setUserPost] = useState();
  const dispatch = useDispatch();

  const fetchUserProfile = () => {
    fetch(`http://localhost:1337/users/${id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(fetchNewsFailure(response.message));
        } else {
          console.log(response);
          setUserProfile(response);
        }
      });
  };
  const fetchUserPost = () => {
    fetch(`http://localhost:1337/posts?user.id=${id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(fetchNewsFailure(response.message));
        } else {
          console.log(response);
          setUserPost(response);
        }
      });
  };
  useEffect(() => {
    fetchUserProfile();
    fetchUserPost();
  }, []);
  return (
    <div>
      <h2>User Profile</h2>
      <p>
        {userProfile && <p>{userProfile.username}</p>}
        {userProfile && <p>{userProfile.email}</p>}
        {userProfile && <p>{userProfile.description}</p>}
      </p>
      <h2>User Posts</h2>
      <ul>
        {userPost && userPost.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </div>

  );
};

export default User;
