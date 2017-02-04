import Main from './Main.js';
import HomePage from './HomePage.js';
import INApp from './INApp/INApp';
import Trans from './trans_num/Trans';
import Auth from './auth/modules/Auth';
import MessageBoard from './msgbd/message-board';
//import ArticlesPage from './ArticlesPage';
//import SingleArticlePage from './SingleArticlePage';
import CreateArticlePage from './Articles/CreateArticlePage';




const routes = {
  // base component (wrapper for the whole application).
  component: Main,
  childRoutes: [

    {
      path: '/',
      component: HomePage
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
      path: '/articles/new',
      component: CreateArticlePage
    },

    {
      path: '/home',
      onEnter: (nextState, replace) => {
        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;
