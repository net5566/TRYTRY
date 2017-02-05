import Base from './Base.js';
import Main from './Main.js';
import HomePage from './auth/components/HomePage.js';
import HomePage2 from './HomePage.js';
import INApp from './INApp/INApp';
import Trans from './trans_num/Trans';
import NotLog from './notlog.js'
import DashboardPage from './auth/containers/DashboardPage.js';
import MessageBoard from './msgbd/message-board';


import LoginPage from './auth/containers/LoginPage.js';
import SignUpPage from './auth/containers/SignUpPage.js';

import AboutMe from './AboutMe';
import TarotHomePage from './tarot/TarotHomePage';
import SingleCardPage from './tarot/SingleCardPage';
import PastPresentFuture from './tarot/PastPresentFuture';
import ArticlesPage from './Articles/ArticlesPage';
import SingleArticlePage from './Articles/SingleArticlePage';
import CreateArticlePage from './Articles/CreateArticlePage';

import Auth from './auth/modules/Auth';

function redirectToLogin(nextState, replace) {
  if( !Auth.isUserAuthenticated() ) {
    replace( {
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    }
      )
  }
}


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Main);
        } else {
          callback(null, HomePage);
        }
      },

      childRoutes: [

      {
        path: '/home',
        component: HomePage2


      },

      {
        path: '/',
        onEnter: (nextState, replace) => {
         // change the current URL to /
          console.log('hello')
          replace('/home');
        }
      },


      {
        path: '/inapp',
        component: INApp
      },

      {
        path: '/trans',
        component: Trans
      },

      {
        path: '/msgbd',
        component: MessageBoard
      },

      {
        path: '/tarot/home',
        component: TarotHomePage
      },

      {
        path: '/tarot/card',
        component: SingleCardPage
      },

      {
        path: '/tarot/past-present-future',
        component: PastPresentFuture
      },

      {
        path: '/articles',
        component: ArticlesPage
      },

      {
        path: '/articles/new',
        component: CreateArticlePage
      },

      {
        path: '/articles/:id',
        component: SingleArticlePage
      }


      ]
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
      path: '/net',
      component: AboutMe
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
