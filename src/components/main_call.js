import React , { Component } from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory, Router } from 'react-router';
import routes from './main_routes.js';


class Main_Call extends Component {
  state = {
    route: window.location.hash.substr(1),
  };


  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  render(){
    return(
        <div>
          <Router history={browserHistory} routes={routes} />
        </div>
      );
  }

}

export default Main_Call;