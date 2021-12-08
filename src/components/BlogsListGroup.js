import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deletePost } from '../api/data/blogData';

export default function BlogsListGroup({ post, setPosts, admin }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePost(post.postId).then((postArray) => setPosts(postArray));
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <img src={post.image} alt="thumbnail" style={{ width: '8em' }} />
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.date}</p>
          <a href={`/blog/${post.postId}`} className="btn btn-primary">
            Read Full Post
          </a>
          {admin ? (
            <button
              type="button"
              className="btn btn danger"
              onClick={() => handleClick('delete')}
            >
              Delete Post
            </button>
          ) : (
            ''
          )}
          {admin ? (
            <Link
              type="button"
              className="btn btn info"
              to={`/editblog/${post.postId}`}
            >
              Edit Post
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}

BlogsListGroup.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string,
    postId: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  setPosts: PropTypes.func.isRequired,
  admin: PropTypes.shape(PropTypes.obj),
};

BlogsListGroup.defaultProps = {
  admin: null,
};
