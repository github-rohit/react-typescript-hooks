import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './common/AuthService';
import Store from './store/Store';
import { set } from './store/User';
import UnProtectedRoute from './common/router/UnProtected';
import ProtectedRoute from './common/router/Protected';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import PostRead from './components/post/PostRead';
import PostCreate from './components/postCreate/Create';
import Author from './components/author/Author';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import NotFound from './components/notFound/NotFound';
import MyPosts from './components/myPosts/MyPosts';
import View from './components/profile/View';
import Edit from './components/profile/Edit';
import ChangePassword from './components/changePassword/ChangePassword';

const App: React.FC = () => {
  useEffect(() => {
    const { token, user } = Auth;
    if (token) {
      Store.dispatch(set(user));
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="container">
        <Switch>
          <UnProtectedRoute path="/login" component={Login} />
          <UnProtectedRoute path="/sign-up" component={Signup} />
          <Route path="/post/:id/:title" component={PostRead} />
          <Route path="/author/:id/:name" component={Author} />

          <ProtectedRoute path="/my/posts/:status" component={MyPosts} />
          <ProtectedRoute path="/my/post/new" component={PostCreate} />
          <ProtectedRoute path="/my/post/:type/:id" component={PostCreate} />
          <ProtectedRoute path="/my/profile/view" component={View} />
          <ProtectedRoute path="/my/profile/edit" component={Edit} />
          <ProtectedRoute
            path="/my/profile/change-password"
            component={ChangePassword}
          />

          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
};

export default App;
