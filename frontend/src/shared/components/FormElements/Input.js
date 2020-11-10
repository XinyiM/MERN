import React, { useReducer  } from 'react';
// useStata allows you to write some logic that 
// runs when you want to change the state to do some complex 
// than just set a value
import "./Input.css";

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                // create a copy of the old state
                ...state,
                value: action.val,
                isValid: true
            };
        default:
            return state;
    }
};

const Input = props => {
    // register the reducer using useReducer
    // params: reducer and a initial state
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});
    // return: currentState, dispatchFunction 
    // this will trigger if the user enters something.
    const changeHandler = event => {
        // event is automatically got object on the change event
        // value is the value the user entered.
        dispatch({type: 'CHANGE', val: event.target.value});
    };

    const element = props.element === "input" ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
        />
    ) : (
            <textarea 
            id={props.id} 
            rows={props.rows || 3} 
            onChange={changeHandler}
            value={inputState.value} />
        );

        // if input state is valid is false;

    return <div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
        <label htmlFor={props.id}> {props.label} </label>
        {element}
        {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
}

export default Input;