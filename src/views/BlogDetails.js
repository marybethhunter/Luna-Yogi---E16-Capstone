import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../api/data/blogData';

export default function BlogDetails() {
  const [post, setPost] = useState({});
  const { blogKey } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSinglePost(blogKey).then(setPost);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card">
      <div className="card-header">{post.title}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <img src={post.image} alt={post.title} />
          <p>{post.date}</p>
          <p>{post.content}</p>
          <footer className="blockquote-footer">Mary Beth Hunter</footer>
        </blockquote>
      </div>
    </div>
  );
}
