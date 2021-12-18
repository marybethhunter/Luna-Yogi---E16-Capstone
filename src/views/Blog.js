import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllPosts } from '../api/data/blogData';
import BlogsListGroup from '../components/BlogsListGroup';

const DivStyle = styled.div`
  margin-right: 400px;
  margin-left: 400px;
`;

export default function Blog({ user, admin }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAllPosts().then((postArray) => {
      if (isMounted) setPosts(postArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <DivStyle>
        {admin ? (
          <Link to="/addblog" style={{ color: 'black' }}>
            Add New Blog Post
          </Link>
        ) : (
          ''
        )}
        {posts.map((post) => (
          <BlogsListGroup
            key={post.postId}
            post={post}
            setPosts={setPosts}
            user={user}
            admin={admin}
          />
        ))}
      </DivStyle>
    </>
  );
}

Blog.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
  admin: PropTypes.shape(PropTypes.obj),
};

Blog.defaultProps = {
  user: null,
  admin: null,
};
