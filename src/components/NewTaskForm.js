import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const defaultTask = {
    title: '',
    description: '',
    isComplete: false,
  };

  const [formData, setFormData] = useState(defaultTask);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;
    const newFormData = { ...formData };
    newFormData[stateName] = inputValue;
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTaskCallback(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onFormChange}
      ></input>
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={onFormChange}
      ></input>
      <input type="submit" value="Add Task"></input>
    </form>
  );
};

NewTaskForm.propTypes = {
  addTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
