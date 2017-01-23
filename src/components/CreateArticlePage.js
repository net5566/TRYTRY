import 'isomorphic-fetch';
import React, { Component } from 'react';
// import ReactQuill from 'react-quill';
// import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';


class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }

  handleSubmitClick = () => {
    // console.log(this.state);
    const confirm = window.confirm('確定要新增文章嗎？'); // eslint-disable-line
    if (confirm) {
      const body = JSON.stringify(this.state);
      fetch('/api/articles', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body,
      })
      .then(res => res.json())
      .then(json => {
        window.location.href = `#/articles/${json._id}`;
      });
      /* .then(json => {
        console.log(`create good! ${JSON.stringify(json)}`);
      })*/
    }
  }

  updateTitle = evt => {
    this.setState({
      title: evt.target.value,
    });
  }

  updateContent = evt => {
    this.setState({
      title: this.state.title,
      content: evt.target.value,
      tags: this.state.tags,
    });
  }

  updateTags = evt => {
    this.setState({
      title: this.state.title,
      content: this.state.content,
      tags: evt.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleSubmitClick}
            >送出</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* title */}
            <input onChange={this.updateTitle} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* tags */}
            <input onChange={this.updateTags} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* content */}
            <textarea onChange={this.updateContent} />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;
