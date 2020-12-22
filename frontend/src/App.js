import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));



const App = () => {
  const { token, login, logout, userId } = useAuth();

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
          <Suspense fallback=
            {
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Switch>
              {routes}
            </Switch>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
