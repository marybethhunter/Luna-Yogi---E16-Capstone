import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../api/data/blogData';

const ButtonStyle = styled.button`
  background-color: white,
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 0px solid white;
`;

export default function BlogsListGroup({ post, setPosts, admin }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePost(post.postId).then((postArray) => setPosts(postArray));
    }
  };

  return (
    <div>
      <div className="card" style={{ margin: 1 }}>
        <div className="card-body">
          <h3 className="card-title">{post.title}</h3>
          <ButtonStyle type="button">
            <a
              href={`/blog/${post.postId}`}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              Read Full Post
            </a>
          </ButtonStyle>
          {admin ? (
            <ButtonStyle
              type="button"
              onClick={() => handleClick('delete')}
              style={{ margin: 10 }}
            >
              Delete Post
            </ButtonStyle>
          ) : (
            ''
          )}
          {admin ? (
            <Link
              type="button"
              to={`/editblog/${post.postId}`}
              style={{ color: 'black', textDecoration: 'none', margin: 10 }}
            >
              Edit Post
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
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
