import React, { Component, PropTypes } from 'react';
import jwt_decode from 'jwt-decode';
import 'isomorphic-fetch';
import './message.css';

let accountName = jwt_decode(localStorage.getItem('token')).name;
let accountId = jwt_decode(localStorage.getItem('token')).sub;

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

const isMine = (user, visitorIn) => {
  if ((user === accountId) || (visitorIn === accountName)) return 'myBlock';
  return 'notMyBlock';
};

const MessageBlock = ({
  user,
  orderIn,
  textIn,
  visitorIn,
  timeIn,
  emotionIn,
  del,
}) => (
  <div className={`MessageBlock ${isOdd(orderIn)} ${isMine(user, visitorIn)}`} onClick={del}>
    <div className="MessageBody">
      "{textIn}", said {visitorIn}.
      <br /><br />
      {timeIn}
    </div>
    <img src={`../dist/png_512/${emojiOut(emotionIn)}.png`} />
  </div>
);
MessageBlock.defaultProps = {
  user: '',
  visitorIn: 'admin',
  timeIn: (new Date()).toString(),
  emotionIn: 'no preference',
  del: (() => {}),
};

class MessageBoard extends Component {
  constructor(props) {
    accountName = jwt_decode(localStorage.getItem('token')).name;
    accountId = jwt_decode(localStorage.getItem('token')).sub;
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
    this.blockHashKey = ['', ''];

    this.blockCreate = this.blockCreate.bind(this);
    this.delBlock = this.delBlock.bind(this);
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
            user={dataIn[i].user}
            orderIn={blockArr.length}
            textIn={dataIn[i].textIn}
            visitorIn={dataIn[i].visitorIn}
            timeIn={dataIn[i].timeIn}
            emotionIn={dataIn[i].emotionIn}
            del={this.delBlock(dataIn[i].user, dataIn[i].visitorIn, blockArr.length)}
          />
        );
        this.blockHashKey.push(dataIn[i]._id);
      }
      this.setState({ nowTime: new Date() });
    }).catch(e => console.log('error: msgInit went wrong', e));

    this.startTick = setInterval(() => {
      this.setState({ nowTime: new Date() });
    }, 1000);
  }
  componentWillUnmount() { clearInterval(this.startTick); }

  blockCreate(emotionStr) {
    return (() => {
      this.visitorText = this.visitorText.trim();
      this.visitorName = this.visitorName.trim();
      if (this.visitorText === '') return;
      if (this.visitorName === '') this.visitorName = accountName;
      const { blockArr, nowTime } = this.state;
      blockArr.push(
        <MessageBlock
          key={`message-left number ${blockArr.length}`}
          user={accountId}
          orderIn={blockArr.length}
          textIn={this.visitorText}
          visitorIn={this.visitorName}
          timeIn={nowTime.toString()}
          emotionIn={emotionStr}
          del={this.delBlock(accountId, this.visitorName, blockArr.length)}
        />
      );
      const body = JSON.stringify({
        user: accountId,
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
        this.blockHashKey.push(dataIn._id);
      }).catch(e => console.log('error: msgPush went wrong', e));
      if (typeof this.textObj !== 'undefined') this.visitorText = this.textObj.target.value = '';
      if (typeof this.nameObj !== 'undefined') this.visitorName = this.nameObj.target.value = '';
      this.setState({ nowTime: new Date() });
    });
  }

  delBlock(user, visitorIn, index) {
    const { blockArr } = this.state;
    if ((user !== accountId) && (visitorIn !== accountName)) return (() => {});
    return (() => {
      const confirm = window.confirm('Are you sure to delete this message?');
      if (confirm) {
        const x = blockArr.length;
        fetch(`/api/message_blocks/${this.blockHashKey[index]}`, { method: 'DELETE' })
        .catch(e => console.log('error: msgDel went wrong', e));
        for (let i = index + 1, j = blockArr[index].props.orderIn; i < x; i += 1) {
          if (typeof blockArr[i] !== 'undefined') {
            const { user, textIn, visitorIn, timeIn, emotionIn, del } = blockArr[i].props;
            blockArr[i] = (
              <MessageBlock
                key={`message-left number ${i}`}
                user={user}
                orderIn={j}
                textIn={textIn}
                visitorIn={visitorIn}
                timeIn={timeIn}
                emotionIn={emotionIn}
                del={del}
              />
            );
            j += 1;
          }
        }
        delete blockArr[index];
        this.setState({});
      }
    });
  }

  render() {
    return (
      <div className="MessageBoard">
        <div className="blockArr">{this.state.blockArr}</div>
        <textarea placeholder="Text here to leave a message..." onKeyUp={e => {
          e.persist();
          this.visitorText = e.target.value;
          this.textObj = e;
        }} />
        <input
          placeholder={`${accountName}`}
          onKeyUp={e => {
            e.persist();
            this.visitorName = e.target.value;
            this.nameObj = e;
          }}
        />
        <img src="../dist/png_512/1f603.png" onClick={this.blockCreate('happy')} />
        <img src="../dist/png_512/1f62f.png" onClick={this.blockCreate('surprised')} />
        <img src="../dist/png_512/1f61e.png" onClick={this.blockCreate('sad')} />
        <img src="../dist/png_512/1f621.png" onClick={this.blockCreate('angry')} />
        <img src="../dist/png_512/1f6ab.png" onClick={this.blockCreate('no preference')} />
        <div className="nowTime">{this.state.nowTime.toString()}</div>
      </div>
    );
  }
}

export default MessageBoard;
