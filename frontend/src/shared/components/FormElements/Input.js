import React, { useReducer, useEffect } from 'react';
// useStata allows you to write some logic that 
// runs when you want to change the state to do some complex 
// than just set a value
import "./Input.css";
import { validate } from "../../util/validators";


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                // create a copy of the old state
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};

const Input = props => {
    // register the reducer using useReducer
    // params: reducer and a initial state
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '', // can be a value provided by outside
        isValid: props.initialValid || false,
        isTouched: false
    });
    // return: currentState, dispatchFunction 
    // this will trigger if the user enters something.

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value,isValid)
    }, [id, value, isValid, onInput] );
    // might lead to infinite loops
    // onInput takes from props from newPlace

    const changeHandler = event => {
        // event is automatically got object on the change event
        // value is the value the user entered.
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element = props.element === "input" ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
    ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value} />
        );

    // if input state is valid is false;

    // only show red if the the input is not valid and the textArea is touched.
    return <div className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'}`}>
            
        <label htmlFor={props.id}> {props.label} </label>
        {element}
        {/* only show errorText if the textArea is Touched  */}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
}

export default Input;