import React , { Component } from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

class App extends Component {
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
        <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>
      );
  }

}

export default App;