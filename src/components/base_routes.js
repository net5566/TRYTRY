import Base from './Base.js';
import Main_Call from './main_call.js';
import HomePage from './auth/components/HomePage.js';
import Trans from './trans_num/Trans';
import NotLog from './notlog.js'
import DashboardPage from './auth/containers/DashboardPage.js';
import LoginPage from './auth/containers/LoginPage.js';
import SignUpPage from './auth/containers/SignUpPage.js';
import Auth from './auth/modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Main_Call);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/home',
      onEnter: (nextState, replace) => {
        // change the current URL to /
        replace('/');
      }
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;
