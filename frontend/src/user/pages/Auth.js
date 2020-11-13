import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators';
import useForm from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import './Auth.css';

const Auth = () => {
    const [formState, inputHandler] = useForm(
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

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }
    return (
        <Card className='authentication'>
            <h2> Login Required </h2>
            <form onSubmit={authSubmitHandler}>
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
                    LOGIN
                </Button>
            </form>
        </Card>
    );
}

export default Auth;