import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  const { Navigate } = useNavigate();
  return (
    <Route
      {...rest}
      render={() => {
        return (user ? children : <Navigate to='/'></Navigate>)
      }}
    ></Route>
  );
};
export default PrivateRoute;
