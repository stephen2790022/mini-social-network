/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchNewsFailure } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [postContent, setPostContent] = useState();
  const [everyPosts, setEveryPosts] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const id = Cookies.get('userId');
  const isLog = useSelector((state) => state.checked);
  const cookie = Cookies.get('token');
  const dispatch = useDispatch();
  const data = {
    user: id,
    text: postContent,
  };
  /* ********************CREATE POST********************** */
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
          if (isSubmit) {
            setIsSubmit(false);
          } else {
            setIsSubmit(true);
          }
        }
      });
  };
  /* ********************CREATE POST END********************** */

  //* ********************DISPLAY ALL POSTS ***********************/

  const allPosts = () => {
    fetch('http://localhost:1337/posts?_limit=20&_sort=created_at:desc', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(fetchNewsFailure(response.message));
        } else {
          console.log(response);
          setEveryPosts(response);
        }
      });
  };
  //* *************************DISPLAY ALL POSTS END****************************************//

  //* ********************HANDLE LIKES ***********************/
  const handleLike = (postLike, postId) => {
    // eslint-disable-next-line eqeqeq
    const alreadyLiked = postLike.filter((element) => element.id == id);
    // eslint-disable-next-line eqeqeq
    const dislike = postLike.filter((element) => element.id != id);
    const likesData = {
      likes: alreadyLiked[0] ? dislike : [...postLike, id],
    };

    fetch(`http://localhost:1337/posts/${postId}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likesData),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.error) {
          dispatch(fetchNewsFailure(response.message));
        } else {
          if (isSubmit) {
            setIsSubmit(false);
          } else {
            setIsSubmit(true);
          }
        }
      });
  };
  //* ********************HANDLE LIKES END***********************/

  //* ********************DELETE A POST ***********************/
  const handlDelete = (postId) => {
    fetch(`http://localhost:1337/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.error) {
          dispatch(fetchNewsFailure(response.message));
        } else {
          if (isSubmit) {
            setIsSubmit(false);
          } else {
            setIsSubmit(true);
          }
        }
      });
  };

  useEffect(() => {
    allPosts();
  }, [isSubmit]);

  return (
    <div>
      <p>
        Welcome on My Social Network. This website is a training to Redux and React.
        We use auth and routing to create a small social media website.
      </p>
      {isLog && <form onSubmit={sendPost}>
        <label>
          Your Post :
          <input type="text" name="email" onChange={(event) => setPostContent(event.target.value)} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>}
      <h2>All POST</h2>
      <ul>
        {everyPosts && everyPosts.map((post) => (
          <li key={post.id}>
            <h3>{isLog && <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>}</h3>
            <p>Post: {post.text}</p>
            {console.log(post.likes)}
            {console.log(post.id)}
            <span>{isLog && <button onClick={() => handleLike(post.likes, post.id)}>{post.likes.length}Like</button>}</span>
            <span>{isLog && <button onClick={() => handlDelete(post.id)}>DELETE</button>}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
