import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { removeError, setErrors } from '../../actions/ui';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: 'ocram_117@hotmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        if( isFormValid ){
            dispatch( startLoginEmailPassword(email, password) );
        }
    }

    const handleGoogleLogin = () =>{
        dispatch( startGoogleLogin() );
    }

    const isFormValid = () => {
        if( !validator.isEmail(email) ){
            dispatch( setErrors('Email is not valid') );
            return false;
        }else if( password ){
            dispatch( setErrors('Password should be at least 6 characters' ) );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form 
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={handleLogin}
            >

                {
                    msgError &&
                    (<div className="auth__alert-error">
                        {msgError}   
                    </div>)
                }

                <input 
                    className="auth__input"
                    type="email"
                    placeholder="email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    className="auth__input"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-block"
                >
                    Login
                </button>
                <hr/>
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create New Account
                </Link>
            </form>
        </>
    )
}
