import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { addPoseToDB } from '../../api/data/yogaData';

const initialState = {
  english_name: '',
  sanskrit_name: '',
  img_url: '',
};

export default function AdminAddPoseForm({ obj = {} }) {
  const history = useHistory();
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    addPoseToDB({ ...formInput }).then(() => {
      history.push('/createflow');
    });
  };

  useEffect(() => {
    if (obj.poseId) {
      setFormInput({
        english_name: obj.english_name,
        sanskrit_name: obj.sanskrit_name,
        img_url: obj.img_url,
      });
    }
  }, [obj]);

  return (
    <div>
      <Form onSubmit={handleClick}>
        <FormGroup>
          <Label for="logo">English Name:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.english_name || ''}
            type="text"
            name="english_name"
            id="english_name"
            placeholder="english name..."
          />
          <Label for="logo">Sanskrit Name:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.sanskrit_name || ''}
            type="text"
            name="sanskrit_name"
            id="sanskrit_name"
            placeholder="sanskrit name..."
          />
          <Label for="logo">Img Link:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.img_url || ''}
            type="text"
            name="img_url"
            id="img_url"
            placeholder="image of pose link..."
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

AdminAddPoseForm.propTypes = {
  obj: PropTypes.shape({}),
};

AdminAddPoseForm.defaultProps = {
  obj: {},
};
