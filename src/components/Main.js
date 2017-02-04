import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from './auth/modules/Auth';

const jwt_decode = require('jwt-decode');
const token = localStorage.getItem('token');
const user_data = jwt_decode(token);
const user_name = user_data.name;

const Main = ({ children }) => (

        <div className="row">

          <div className="col-sm-8 blog-main">
          
          {children}

            <nav>
              <ul className="pager">
                <li><a href="#">Home</a></li>
              </ul>
            </nav>

          </div>

          <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
            <div className="sidebar-module sidebar-module-inset">
              <p><a className="btn btn-success btn-lg" href="/articles" role="button">文章列表</a></p>
              <p><a className="btn btn-success btn-lg" href="/articles/new" role="button">發表新文章</a></p>
              <h4>About Me</h4>
              <h5>Member ID: {user_name} </h5>
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
          </div>

        </div>

  );




Main.propTypes = {
  children: PropTypes.object.isRequired
};

export default Main;
