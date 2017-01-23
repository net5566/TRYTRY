import React, { Component } from 'react';

import HomePage from './HomePage';
import ArticlesPage from './ArticlesPage';
import SingleArticlePage from './SingleArticlePage';
import CreateArticlePage from './CreateArticlePage';
import UsersPage from './UsersPage';
import SingleUserPage from './SingleUserPage';
import AboutMe from './AboutMe';
import Deu from './Deu';
import Trans from './Trans';
import Deu161201 from './Deu161201';
import Notiz from './Notiz';
import INApp from './INApp/INApp';

import TarotHomePage from './tarot/TarotHomePage';
import SingleCardPage from './tarot/SingleCardPage';
import PastPresentFuture from './tarot/PastPresentFuture';

import MessageBoard from './message-board';

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

    if (this.state.route === '/net') {
      return <AboutMe />;
    }  

    if (this.state.route === '/deu') {
      return <Deu />;
    }  


    if (this.state.route === '/trans') {
      return <Trans />;
    }

    if (this.state.route === '/deu161201') {
      return <Deu161201 />;
    }

    if (this.state.route === '/links') {
      return <UsersPage />;
    }

    if (this.state.route.startsWith('/links/')) {
      const id = this.state.route.split('/links/')[1];
      return <SingleUserPage id={id} />;
    }

    if (this.state.route === '/tarot/home') {
      return <TarotHomePage />;
    }

    if (this.state.route === '/tarot/card') {
      return <SingleCardPage />;
    }

    if (this.state.route === '/tarot/past-present-future') {
      return <PastPresentFuture />;
    }

    if (this.state.route === '/notiz') {
      return <Notiz />;
    }

    if (this.state.route === '/articles') {
      return <ArticlesPage />;
    }

    if (this.state.route === '/articles/new') {
      return <CreateArticlePage />;
    }

    if (this.state.route === '/msgbd') {
      return <MessageBoard />;
    }

    if (this.state.route === '/inapp') {
    //return <HomePage />;
    return <INApp />;
    }

    if (this.state.route.startsWith('/articles/')) {
      const id = this.state.route.split('/articles/')[1];
      return <SingleArticlePage id={id} />;
    }

    return <HomePage />;
  }

  renderBreadcrumb() {
    if (this.state.route === '/articles') {
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
        </ol>
      );
    }

    if (this.state.route.startsWith('/articles/')) {
      const id = this.state.route.split('/articles/')[1];
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
          <li><a href={`#/articles/${id}`}>{id}</a></li>
        </ol>
      );
    }

    return (
      <ol className="breadcrumb">
        <li><a href="#/">Home</a></li>
      </ol>
    );
  }

  render() {
      return(
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
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Sign in</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>        
        <div className="blog-header">
          <h1 className="blog-title">Personal HomePage</h1>
          <p className="lead blog-description">Leo Net Serena</p>
        </div>

        <div className="row">

          <div className="col-sm-8 blog-main">
          
          {this.renderRoute()}

            <nav>
              <ul className="pager">
                <li><a href="#">Home</a></li>
              </ul>
            </nav>

          </div>

          <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
            <div className="sidebar-module sidebar-module-inset">
              <p><a className="btn btn-success btn-lg" href="#/articles" role="button">文章列表</a></p>
              <p><a className="btn btn-success btn-lg" href="#/articles/new" role="button">發表新文章</a></p>
              <h4>About Me</h4>
              <h5>Member ID: net5566 </h5>
              <p>test test</p>
            </div>
            <div className="sidebar-module">
              <h4>Archives</h4>
              <ol className="list-unstyled">
                <li><a href="#/">Home 首頁</a></li>
                <li><a href="#/tarot/home">Tarot 塔羅</a></li>
                <li><a href="#/msgbd">MessageBoard</a></li>
                <li><a href="#/inapp">Web bookmarks</a></li>
                <li><a href="#/trans">Trans 數字轉換</a></li>

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
      </div>
    );
/*
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#/">Web Seminar - Blog</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <p><a className="btn btn-success btn-lg" href="#/articles/new" role="button">發表新文章</a></p>
                <a href="#/articles">Articles</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.renderBreadcrumb()}
            </div>
          </div>
        </div>
        {this.renderRoute()}
      </div>
    );

    */
  }
}


export default App;
