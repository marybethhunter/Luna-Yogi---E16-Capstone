import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminBlogForm from '../components/forms/AdminBlogForm';
import { getSinglePost } from '../api/data/blogData';

export default function AdminEditBlog({ admin }) {
  const [editPost, setEditPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSinglePost(postId).then(setEditPost);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <AdminBlogForm obj={editPost} admin={admin} />
    </>
  );
}

AdminEditBlog.propTypes = {
  admin: PropTypes.shape(PropTypes.obj),
};

AdminEditBlog.defaultProps = {
  admin: null,
};
