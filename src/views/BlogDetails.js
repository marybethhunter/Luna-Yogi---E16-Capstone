import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getSinglePost, updatePostWithUserId } from '../api/data/blogData';
// import { addBlogFBKey } from '../api/data/userData';

export default function BlogDetails({ user }) {
  const [post, setPost] = useState({});
  const { blogKey } = useParams();

  const saveUserIDToPost = () => {
    updatePostWithUserId(blogKey, { userId: user.uid });
  };

  useEffect(() => {
    let isMounted = true;
    getSinglePost(blogKey).then((postArray) => {
      if (isMounted) setPost(postArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        {post.title}
        <>
          {user ? (
            <button type="button" onClick={saveUserIDToPost}>
              Save Blog Post To Account
            </button>
          ) : (
            ''
          )}
        </>
      </div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <img style={{ width: '30rem' }} src={post.image} alt={post.title} />
          <p>{post.date}</p>
          <p>{post.content}</p>
          <footer className="blockquote-footer">Mary Beth Hunter</footer>
        </blockquote>
      </div>
    </div>
  );
}

BlogDetails.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

BlogDetails.defaultProps = {
  user: null,
};
