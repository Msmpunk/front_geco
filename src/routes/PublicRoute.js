import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/Auth'; // Adjust the import path accordingly

const PublicRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Redirect to="/admin" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
