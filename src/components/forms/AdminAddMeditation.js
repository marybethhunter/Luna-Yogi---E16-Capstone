import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { addMedToDB } from '../../api/data/meditationData';

const initialState = {
  meditation_duration: '',
  meditation_image: '',
  meditation_subtitle: '',
  meditation_title: '',
  meditation_url: '',
  meditation_webplayer_url: '',
};

export default function AdminAddMeditation({ obj = {} }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.meditationId) {
      setFormInput({
        meditation_duration: obj.meditation_duration,
        meditation_image: obj.meditation_image,
        meditation_subtitle: obj.meditation_subtitle,
        meditation_title: obj.meditation_title,
        meditation_url: obj.meditation_url,
        meditation_webplayer_url: obj.meditation_webplayer_url,
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    addMedToDB({ ...formInput }).then(() => {
      history.push('/meditation');
    });
  };

  return (
    <div style={{ marginBottom: 75 }}>
      <Form onSubmit={handleClick}>
        <FormGroup>
          <Label for="meditation_title">Meditation Title:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.meditation_title || ''}
            type="text"
            name="meditation_title"
            id="meditation_title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="meditation_duration">
            Duration in Minutes (put hyphen before the time):
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.meditation_duration || ''}
            type="text"
            name="meditation_duration"
            id="meditation_duration"
          />
        </FormGroup>
        <FormGroup>
          <Label for="meditation_image">Mediation Img Link:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.meditation_image || ''}
            type="text"
            name="meditation_image"
            id="meditation_image"
          />
        </FormGroup>
        <FormGroup>
          <Label for="meditation_subtitle">Meditation Subtitle:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.meditation_subtitle || ''}
            type="textarea"
            name="meditation_subtitle"
            id="meditation_subtitle"
          />
        </FormGroup>
        <FormGroup>
          <Label for="meditation_url">Meditation URL:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.meditation_url || ''}
            type="text"
            name="meditation_url"
            id="meditation_url"
          />
        </FormGroup>
        <FormGroup>
          <Label for="meditation_webplayer_url">
            Meditation Webplayer URL:
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.meditation_webplayer_url || ''}
            type="text"
            name="meditation_webplayer_url"
            id="meditation_webplayer_url"
          />
        </FormGroup>
        <Button type="submit">Add New Meditation</Button>
      </Form>
    </div>
  );
}

AdminAddMeditation.propTypes = {
  obj: PropTypes.shape({
    meditation_duration: '',
    meditation_image: '',
    meditation_subtitle: '',
    meditation_title: '',
    meditation_url: '',
    meditation_webplayer_url: '',
  }),
};

AdminAddMeditation.defaultProps = {
  obj: {},
};
