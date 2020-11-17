import React, { useState, useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLogin, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false
            },
            password: {
                value: "",
                isValid: false
            }
        }, false
    );

    const switchModeHandler = () => {
        if (!isLogin) {
            // in signup mode && in switch handler
            // switching to login mode,
            // need to drop the name field
            // the form validity depends on the email and password fields
            setFormData(
                {
                    // because we did not copy the former state and then rewrite the name property 
                    // cause cannot read isValid property from undefined
                    ...formState.inputs,
                    name: undefined
                    // although we copied the old fields, 
                    // it still tries to access the isValid property of the undefined name
                    // which cause crash,
                    // should add a if-check to avoid the undefined case.
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                }, false
            );
        }
        setIsLoginMode(preMode => !preMode);
    }

    const authSubmitHandler = async event => {
        event.preventDefault();
        // console.log(formState.inputs);

        if (isLogin) {

        } else {
            try {
                // send a http request to the backend
                const response = await fetch("http://localhost:5000/api/users/signup", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                }); // a string points to the backend
                const responseData = await response.json();
                console.log(responseData);
            } catch (err) {
                console.log(err);
            }
        }
        auth.login();
    }
    return (
        <Card className='authentication'>
            <h2> Login Required </h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLogin && <Input
                    element='input'
                    id='name'
                    type='text'
                    label='Your Name'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name"
                    onInput={inputHandler}
                />}
                <Input id="email"
                    element="input"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email."
                    onInput={inputHandler}
                />
                <Input id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password."
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>
                    {isLogin ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}> SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}</Button>
        </Card>
    );
}

export default Auth;