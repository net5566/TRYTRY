import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';
import ReactQuill from 'react-quill';

class SingleArticlePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      isEditing: false,
    };
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    // fetch with id
    const id = this.props.id;
    fetch(`/api/articles/${id}`)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState(json);
      });
  }

  componentDidUpdate() {
    // fetch with id
  }

  handleTagsChange = evt => {
    this.setState({ tags: evt.target.value });
  };

  handleTitleChange = evt => {
    this.setState({ title: evt.target.value });
    // console.log('yay');
  };

  handleContentChange = evt => {
    this.setState({ content: evt.target.value });
    // console.log(this.state.content);
  };

  handleDelClick = () => {
    const id = this.props.id;
    fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      window.location.href = '#/articles';
    });
  }

  handleEditClick = () => {
    if (this.state.isEditing) {
      const body = JSON.stringify(this.state);
      const id = this.props.id;
      fetch(`/api/articles/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body,
      });
    }
    this.setState({ isEditing: !this.state.isEditing });
  };

  renderTitle = () => {
    const { isEditing, title } = this.state;
    if (isEditing) {
      return <input onChange={this.handleTitleChange} value={title} />;
    }
    return this.state.title;
  }

  renderTags = () => {
    const { isEditing, tags } = this.state;
    if (isEditing) {
      return <input onChange={this.handleTagsChange} value={tags} />;
    }
    return this.state.tags;
  }

  renderContent = () => {
    const { isEditing, content } = this.state;
    if (isEditing) {
      return <textarea onChange={this.handleContentChange} defaultValue={content} />;
    }
    return this.state.content;
  }

  render() {
    const { isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              {this.renderTitle()}
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderContent()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-info"
              role="button"
              onClick={this.handleEditClick}
            >{isEditing ? '確認' : '編輯'}</button>
            {isEditing ? null :
            <button
              className="btn btn-warning"
              role="button"
              onClick={this.handleDelClick}
            >刪除</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticlePage;
