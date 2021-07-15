import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setErrors } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'Marco',
        email: 'ocram_117@hotmail.com',
        password: '123456',
        password2: '123456'
    });

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }
    }

    const isFormValid = () => {
        if( name.trim().length === 0 ){
            dispatch( setErrors('Name is required') );
            return false;
        }else if( !validator.isEmail(email) ){
            dispatch( setErrors('Email is not valid') );
            return false;
        }else if( password !== password2 || password.length < 5){
            dispatch( setErrors('Password should be at least 6 characters long and match each other') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>
        <h3 className="auth__title">Register</h3>
        <form 
            className="animate__animated animate__fadeIn animate__faster"
            onSubmit={handleRegister}
        >

            {
                msgError &&
                (<div className="auth__alert-error">
                    {msgError}   
                </div>)
            }
            
            <input 
                className="auth__input"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                autoComplete="off"
                onChange={handleInputChange}
            />

            <input 
                className="auth__input"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                autoComplete="off"
                onChange={handleInputChange}
            />

            <input 
                className="auth__input"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
            />

            <input 
                className="auth__input"
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleInputChange}
            />

            <button
                type="submit"
                className="btn btn-primary btn-block mb-5"
            >
                Register
            </button>
            <Link 
                to="/auth/login"
                className="link mt-5"
            >
                Already registered?
            </Link>
        </form>
    </>
    )
}
