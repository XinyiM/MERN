import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import './NewPlace.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      console.log(state.inputs);
      console.log(formIsValid);
      return {
        ...state,
        inputs: { // Attention: 是inputs不是input!!
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
    },
    // a nested object that stores the info of individual inputs
    isValid: false
    // isValid stores the info whether the overall form is valid.
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    })
  }, []);


  return <form className="place-form">
    <Input
      id="title"
      element="input"
      type='text'
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      // returns a validator configurations 
      errorText="Please enter a valid title."
      onInput={inputHandler}
    />
    {/* for this input, make sure the value is not empty */}
    <Input
      id="description"
      element="textarea"
      label="Description"
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="Please enter a valid description (at least 5 chars)."
      onInput={inputHandler}
    />
    <Button type="submit" disabled={!formState.isValid}>
      ADD PLACE
    </Button>
  </form>
};

export default NewPlace;