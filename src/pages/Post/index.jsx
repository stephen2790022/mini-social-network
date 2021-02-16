/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import { fetchNewsFailure } from 'redux/actions';
import { useDispatch } from 'react-redux';

const Post = () => {
  const [postContent, setPostContent] = useState();
  const id = Cookies.get('userId');
  const cookie = Cookies.get('token');
  const history = useHistory();
  const dispatch = useDispatch();
  const data = {
    user: id,
    text: postContent,
  };

  const sendPost = (event) => {
    event.preventDefault();
    fetch('http://localhost:1337/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(fetchNewsFailure(response.message));
        } else {
          history.push('/home');
        }
      });
  };

  return (
    <div>
      <form onSubmit={sendPost}>
        <label>
          Your Post :
          <input type="text" name="email" onChange={(event) => setPostContent(event.target.value)} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default Post;
