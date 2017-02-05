import { Link } from 'react-router';
import React, { Component } from 'react';

import './home.css';

class TarotHomePage extends Component {
  render() {
    return (
      <div className="FirstPage">
        <h1>Daily Tarot</h1>
        <p> </p>
        <img className="magic" src="http://i.imgur.com/SRGVLtO.png"/>
        <p> </p>
        <p className="pre"> Breathe deeply, focus on a question, set your intention... </p>
        <p className="pre"> And when you are ready, click on the start botton below. </p>
        <p> </p>
        <Link to="/tarot/card" className="btn btn-warning btn-lg">Start</Link>
        <Link to="/tarot/past-present-future" className="btn btn-warning btn-lg">Past Present Future</Link>
      </div>
    );
  }
}

export default TarotHomePage;
