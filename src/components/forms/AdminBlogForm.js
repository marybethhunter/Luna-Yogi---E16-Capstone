import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { addNewPost, updatePost } from '../../api/data/blogData';

const initialState = {
  title: '',
  image: '',
  date: '',
  content: '',
};

export default function AdminBlogForm({ obj = {} }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.postId) {
      setFormInput({
        title: obj.title,
        date: obj.date,
        image: obj.image,
        content: obj.content,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (obj.postId) {
      updatePost(obj.postId, formInput).then(() => {
        history.push('/blog');
      });
    } else {
      addNewPost({ ...formInput }).then(() => {
        resetForm();
        history.push('/blog');
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleClick}>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.title || ''}
            type="text"
            name="title"
            id="title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.date || ''}
            type="text"
            name="date"
            id="date"
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image Link:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.image || ''}
            type="text"
            name="image"
            id="image"
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.content || ''}
            type="textarea"
            name="content"
            id="content"
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

AdminBlogForm.propTypes = {
  obj: PropTypes.shape({
    title: '',
    image: '',
    date: '',
    content: '',
    postId: '',
  }),
};

AdminBlogForm.defaultProps = {
  obj: {},
};
