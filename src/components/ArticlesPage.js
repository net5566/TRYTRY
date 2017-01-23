import 'isomorphic-fetch';
import React, { Component } from 'react';


class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderArticlesList = this.renderArticlesList.bind(this);
  }

  componentDidMount() {
    fetch('/api/articles')
      .then(res => res.json())
      .then(json => {
        this.setState({
          list: json,
        });
        // console.log(json);
      });
      /*
      .catch(rej => {
        // console.log(rej);
      });
      */
  }

  renderArticlesList() {
    const c = [];
    if (this.state.list === undefined) return;
    for (let i = 0; i < this.state.list.length; i += 1) {
      c.push(
        <tr>
          <th>{i + 1}</th>
          <th><a href={`#/articles/${this.state.list[i]._id}`}>{this.state.list[i].title}</a></th>
          <th>{this.state.list[i].tags}</th>
          <th>{this.state.list[i].updated_at}</th>
          <th>{this.state.list[i].created_at}</th>
        </tr>
      );
    }
    return c; // eslint-disable-line
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* implement */}
            <table className="table">
              <caption>{'What\'s on the list?'}</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Last updated time</th>
                  <th>Created time</th>
                </tr>
              </thead>
              <tbody>
                {this.renderArticlesList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
