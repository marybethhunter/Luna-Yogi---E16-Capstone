import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { addAffToDB } from '../../api/data/affirmationData';

const initialState = {
  affirmation: '',
};

export default function AdminAddAffirmation({ obj = {} }) {
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
    addAffToDB({ ...formInput }).then(() => {
      history.push('/mantra');
    });
  };

  useEffect(() => {
    if (obj.affirmId) {
      setFormInput({
        affirmation: obj.affirmation,
      });
    }
  }, [obj]);

  return (
    <div>
      <Form onSubmit={handleClick}>
        <FormGroup>
          <Label for="affirmation">Affirmation:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.affirmation || ''}
            type="text"
            name="affirmation"
            id="affirmation"
            placeholder="affirmation..."
          />
        </FormGroup>
        <Button>Add New Affirmation</Button>
      </Form>
    </div>
  );
}

AdminAddAffirmation.propTypes = {
  obj: PropTypes.shape({}),
};

AdminAddAffirmation.defaultProps = {
  obj: {},
};
