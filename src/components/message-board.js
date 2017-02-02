import React, { Component, PropTypes } from 'react';
import './message.css';

const emojiOut = emotionIn => {
  if (emotionIn === 'sad') return '1f61e';
  if (emotionIn === 'happy') return '1f603';
  if (emotionIn === 'angry') return '1f621';
  if (emotionIn === 'surprised') return '1f62f';
  return '1f6ab';
};

const isOdd = orderIn => {
  if (orderIn % 2 === 1) return 'oddColor';
  return 'evenColor';
};

const MessageBlock = ({
  orderIn,
  textIn,
  visitorIn,
  timeIn,
  emotionIn
}) => (
  <div className={`MessageBlock ${isOdd(orderIn)}`}>
    <div className="MessageBody">
      "{textIn}", said {visitorIn}.
      <br /><br />
      {timeIn}
    </div>
    <img src={`./dist/png_512/${emojiOut(emotionIn)}.png`} />
  </div>
);
MessageBlock.defaultProps = {
  visitorIn: 'admin',
  timeIn: (new Date()).toString(),
  emotionIn: 'no preference',
};

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowTime: new Date(),
      blockArr: [
        <MessageBlock
          key={`message-left number ${0}`}
          orderIn={0}
          textIn="Go Ahead!"
          emotionIn="happy"
        />,
        <MessageBlock
          key={`message-left number ${1}`}
          orderIn={1}
          textIn="Let's Chat!"
          emotionIn="happy"
        />
      ],
    };
    this.visitorText = '';
    this.visitorName = '';
    this.blockCreate = this.blockCreate.bind(this);
  }
  componentDidMount() {
    fetch('/api/message_blocks')
    .then(res => res.json())
    .then(dataIn => {
      const { blockArr } = this.state;
      for (let i = 0, j = dataIn.length; i < j; i += 1) {
        blockArr.push(
          <MessageBlock
            key={`message-left number ${blockArr.length}`}
            orderIn={blockArr.length}
            textIn={dataIn[i].textIn}
            visitorIn={dataIn[i].visitorIn}
            timeIn={dataIn[i].timeIn}
            emotionIn={dataIn[i].emotionIn}
          />
        );
      }
    }).catch(e => console.log('error: something went wrong', e));

    this.startTick = setInterval(() => {
      this.setState({ nowTime: new Date() });
    }, 1000);
    this.setState({ nowTime: new Date() });
  }
  componentWillUnmount() { clearInterval(this.startTick); }

  blockCreate(emotionStr) {
    return (() => {
      this.visitorText = this.visitorText.trim();
      this.visitorName = this.visitorName.trim();
      if (this.visitorText === '') return;
      if (this.visitorName === '') this.visitorName = '(Anonymous)';
      const { blockArr, nowTime } = this.state;
      blockArr.push(
        <MessageBlock
          key={`message-left number ${blockArr.length}`}
          orderIn={blockArr.length}
          textIn={this.visitorText}
          visitorIn={this.visitorName}
          timeIn={nowTime.toString()}
          emotionIn={emotionStr}
        />
      );
      const body = JSON.stringify({
        visitorIn: this.visitorName,
        textIn: this.visitorText,
        emotionIn: emotionStr,
        timeIn: nowTime.toString(),
      });
      fetch('/api/message_blocks', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body,
      }).then(res => res.json())
      .then(dataIn => {
        console.log(dataIn);
      }).catch(e => console.log('error: something went wrong', e));
      this.setState({ nowTime: new Date() });
    });
  }

  render() {
    return (
      <div className="MessageBoard">
        <div className="blockArr">{this.state.blockArr}</div>
        <textarea placeholder="Text here to leave a message..." onKeyUp={e => {
          this.visitorText = e.target.value;
        }} />
        <input placeholder="Nickname, please." onKeyUp={e => {
          this.visitorName = e.target.value;
        }} />
        <img src="./dist/png_512/1f603.png" onClick={this.blockCreate('happy')} />
        <img src="./dist/png_512/1f62f.png" onClick={this.blockCreate('surprised')} />
        <img src="./dist/png_512/1f61e.png" onClick={this.blockCreate('sad')} />
        <img src="./dist/png_512/1f621.png" onClick={this.blockCreate('angry')} />
        <img src="./dist/png_512/1f6ab.png" onClick={this.blockCreate('no preference')} />
        <div className="nowTime">{this.state.nowTime.toString()}</div>
      </div>
    );
  }
}

export default MessageBoard;
