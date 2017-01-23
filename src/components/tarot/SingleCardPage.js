import React, { Component, PropTypes } from 'react';

import './single-card.css';

class SingleCardPage extends Component {

  constructor() {
    super();
    this.state = {
      card: {},
    };
  }

  componentDidMount() {
    fetch('/api/random')
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({
          card: body
        });
      });
    // fetch `/api/users/${id}` to get user and then set state...
  }

  render() {
    const {card} = this.state;
    return (
      <div className="FirstPage">
        <h1>Today's Card:</h1>
        <div className="row">
          <div className="col-md-6">
            <img src={card.image} />
          </div>
          <div className="col-md-6">
            <h2>{card.name}</h2>
            <p>
              {card.description}
            </p>
          </div>
        </div>
        <p></p>
        <a href="/#/tarot/home" className="btn btn-warning btn-lg">Back</a>
      </div>
    );
  }
}

export default SingleCardPage;
