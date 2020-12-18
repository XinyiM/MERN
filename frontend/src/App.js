import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlaces';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';


const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null)
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path='/:userId/places'>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* should put NewPlaces first and then UpdatePlace */}
        {/* in case the new is interpreted as the placeId */}
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path='/:userId/places'>
          <UserPlaces />
        </Route>
        <Route path="/auth" >
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }
  return (
    // every component used in the app.js has access to the context
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // convert to boolean
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
      {/* bind the value with the context  */}
      {/* when the value changes, everything in the context will re-render */}
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            {routes}
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
