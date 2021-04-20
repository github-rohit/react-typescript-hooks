import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../AuthService';

// tslint:disable-next-line: variable-name
function UnProtected({ path, component: Component, render, ...rest }: any) {
  return (
    <Route
      {...rest}
      // tslint:disable-next-line: jsx-no-lambda
      render={(props) => {
        if (Auth.user) {
          return (
            <Redirect
              to={{
                pathname: '/my/posts/published',
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

export default UnProtected;
