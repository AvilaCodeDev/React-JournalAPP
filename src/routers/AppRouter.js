import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
  } from "react-router-dom";

import { firebase } from '../firebase/firebaseConfig';
 import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIN, setIsLoggedIN] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            
            if( user?.uid ){
                dispatch( login( user.uid , user.displayName ) );
                setIsLoggedIN(true);

                dispatch( startLoadingNotes( user.uid ) );

            }else{
                setIsLoggedIN(false);
            }

            setChecking(false);

        } );
    }, [ dispatch, setChecking, setIsLoggedIN ])

    if(checking){
        return (
            <h1>Wait...</h1>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={ isLoggedIN }
                        component={ AuthRouter }
                    />
                    <PrivateRoute 
                        exact 
                        path="/"
                        isAuthenticated={ isLoggedIN }
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
