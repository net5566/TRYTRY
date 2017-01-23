import React, { Component } from 'react';

import TarotHomePage from './TarotHomePage';
import SingleCardPage from './SingleCardPage';

import './app.css';

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

  renderRoute() {
    if (this.state.route === '/card') {
      return <SingleCardPage />;
    }

    return <TarotHomePage />;
  }

  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-inverse">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Tarot</a>
          </div>
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><a href="#/">Home</a></li>
            </ul>
          </div>
        </nav>
        {this.renderRoute()}
      </div>
    );
  }
}


export default App;
