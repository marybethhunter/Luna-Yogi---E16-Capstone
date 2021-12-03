import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api/data/blogData';
import BlogsListGroup from '../components/BlogsListGroup';

export default function Blog({ user }) {
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
      {user?.isAdmin && <Link to="/addblog">Add New Blog Post</Link>}
      <>
        {posts.map((post) => (
          <BlogsListGroup
            key={post.postId}
            post={post}
            setPosts={setPosts}
            user={user}
          />
        ))}
      </>
    </>
  );
}

Blog.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Blog.defaultProps = {
  user: null,
};
