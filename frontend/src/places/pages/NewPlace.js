import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validator';
import './NewPlace.css';

const NewPlace = () => {
  return <form className="place-form">
    <Input
      element="input"
      type='text'
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      // returns a validator configurations 
      errorText="Please enter a valid title."
    />
    {/* for this input, make sure the value is not empty */}

  </form>
};

export default NewPlace;