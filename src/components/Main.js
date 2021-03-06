import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from './auth/modules/Auth';
import Forecast from 'react-forecast';

const jwt_decode = require('jwt-decode');
//const token = localStorage.getItem('token');
//const user_data = jwt_decode(token);
//const user_name = user_data.name;

const Main = ({ children }) => (

        <div className="row">

          <div className="col-sm-8 blog-main">
          
          {children}

            <nav>
              <ul className="pager">
                <li><Link to='/home'>Home</Link></li>
              </ul>
            </nav>

          </div>

          <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
            <div className="sidebar-module sidebar-module-inset">
              <p><Link className="btn btn-success btn-lg" to="/articles" role="button">文章列表</Link></p>
              <p><Link className="btn btn-success btn-lg" to="/articles/new" role="button">發表新文章</Link></p>
              <h4>About Me</h4>
              <h5>Member ID: {jwt_decode(localStorage.getItem('token')).name} </h5>
              <p>test test</p>
            </div>
            <div className="sidebar-module">
              <h4>Archives</h4>
              <ol className="list-unstyled">
                <li><Link to="/home">Home 首頁</Link></li>
                <li><Link to="/tarot/home">Tarot 塔羅</Link></li>
                <li><Link to="/msgbd">MessageBoard</Link></li>
                <li><Link to="/inapp">Web bookmarks</Link></li>
                <li><Link to="/trans">Trans 數字轉換</Link></li>
              </ol>
            </div>
            <div className="sidebar-module">
              <h4>Elsewhere</h4>
              <ol className="list-unstyled">
                <li><a href="https://github.com/net5566/TRYTRY">GitHub</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
              </ol>
            </div>
            <div className="sidebar-module">
              <Forecast latitude={25.02} longitude={121.31} name='Taipei' units='si' />
              <Forecast latitude={37.47} longitude={-122.25} name='San Francisco' units='si'/>
              <Forecast latitude={40.40} longitude={-73.56} name='New York' units='si'/>
              <Forecast latitude={35.41} longitude={139.41} name='Tokyo' units='si'/>          </div>
          </div>

        </div>

  );




Main.propTypes = {
  children: PropTypes.object.isRequired
};

export default Main;
