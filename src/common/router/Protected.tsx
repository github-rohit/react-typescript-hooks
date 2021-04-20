import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../AuthService';

// tslint:disable-next-line: variable-name
function Protected({ path, component: Component, render, ...rest }: any) {
  return (
    <Route
      {...rest}
      // tslint:disable-next-line: jsx-no-lambda
      render={(props) => {
        if (!Auth.token) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default Protected;
