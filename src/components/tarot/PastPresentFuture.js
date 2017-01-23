import React, { Component, PropTypes } from 'react';

import './single-card.css';

class PastPresentFuture extends Component {

  constructor() {
    super();
    this.state = {
      cards: null,
    };
  }

  componentDidMount() {
    fetch('/api/random3')
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({
          cards: body
        });
      });
    // fetch `/api/users/${id}` to get user and then set state...
  }

  render() {
    console.log(cards);
    const {cards} = this.state;
    if (!cards) { return null; }
    else {
      return (
        <div className="FirstPage">
          <h1>Today's Card:</h1>
          <div className="row">
            <div className="col-md-4">
              <img src={cards[0].image} />
            </div>
            <div className="col-md-4">
              <img src={cards[1].image} />
            </div>
            <div className="col-md-4">
              <img src={cards[2].image} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h2>{cards[0].name}</h2>
              <p>
                {cards[0].description}
              </p>
            </div>
            <div className="col-md-4">
              <h2>{cards[1].name}</h2>
              <p>
                {cards[1].description}
              </p>
            </div>
            <div className="col-md-4">
              <h2>{cards[2].name}</h2>
              <p>
                {cards[2].description}
              </p>
            </div>
          </div>
          <p></p>
          <a href="/#/tarot/home" className="btn btn-warning btn-lg">Back</a>
        </div>
      );
    }
  }
}

export default PastPresentFuture;
