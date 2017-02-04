import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from './auth/modules/Auth';

const jwt = require('jwt-decode');


const Base = ({ children }) => (

<div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Brand</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                <li><a href="#/net">About Us</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">One more separated link</a></li>
                  </ul>
                </li>
              </ul>
              {Auth.isUserAuthenticated() ? (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/logout">Log out</Link></li>
                {console.log(localStorage.getItem('token'))}
                {console.log(jwt(localStorage.getItem('token')).name)}
              </ul>
              ) : (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
              </ul>
              )}

            </div>
          </div>
        </nav>        
        <div className="blog-header">
          <h1 className="blog-title">Personal HomePage</h1>
          <p className="lead blog-description">Leo Net Serena</p>
        </div>

        {children}
        
      </div>

  );




Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
