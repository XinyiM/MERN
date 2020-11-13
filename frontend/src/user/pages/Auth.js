import React, { useState } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import './Auth.css';

const Auth = () => {
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

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }
    return (
        <Card className='authentication'>
            <h2> Login Required </h2>
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