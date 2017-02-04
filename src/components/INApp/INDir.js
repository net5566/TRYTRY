import React from 'react';
import 'isomorphic-fetch';
import './INDir.css';
import INObj from './INObj';

class INDir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementArr: [],
      show: 0,
    };

    this.delBlock = this.delBlock.bind(this);
    this.add = this.add.bind(this);
    this.blockCreate = this.blockCreate.bind(this);
  }

  componentDidMount() {
    const { elementArr } = this.props;
    for (let i = 0, j = elementArr.length; i < j; i += 1) {
      if (typeof elementArr[i] === 'undefined') this.state.elementArr.push(undefined);
      else this.state.elementArr.push(
        <INObj
          key={`${this.props.nm} block ${i}`}
          nm={elementArr[i].nm}
          url={elementArr[i].url}
          del={this.delBlock(i)}
        />
      );
    }
  }

  delBlock(index) {
    const { elementArr, hashKey } = this.props;
    const body = JSON.stringify({
      action: 'pull',
      nm: elementArr[index].nm,
      url: elementArr[index].url,
    });
    return (() => {
      fetch(`/api/in_app/dir/${hashKey}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body,
      });
      delete elementArr[index];
      delete this.state.elementArr[index];
      this.setState({});
    });
  }

  add(e) {
    if (e.key === 'Enter') {
      const tmpMsg = e.target.value.trim();
      e.target.value = '';
      const oldBlock = this.props.fetcher(tmpMsg);
      if (typeof oldBlock !== 'undefined') {
        const { elementArr } = this.state;
        const { nm, url } = oldBlock.props;
        const id = elementArr.length;
        const body = JSON.stringify({
          action: 'push',
          nm: nm,
          url: url,
        });
        fetch(`/api/in_app/dir/${this.props.hashKey}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body,
        });
        this.props.elementArr.push({ nm: nm, url: url });
        elementArr.push(
          <INObj
            key={`${this.props.nm} block ${id}`}
            nm={nm}
            url={url}
            del={this.delBlock(id)}
          />
        );
        this.setState({});
      }
    }
  }

  blockCreate() {
  	const msg = 'Enter New Members';
  	const { show, elementArr } = this.state;
    if (show === 1) return elementArr;
    if (show === 2) return <input type="text" placeholder={msg} onKeyPress={this.add} />;
  }

  render() {
  	return (
  	  <div className="dir-area">
        <div className="dir-link">
          <input type="button" value="+" className="addBlock" onClick={() => {
            if (this.state.show === 2) this.setState({ show: 0 });
            else this.setState({ show: 2 });
          }} />
          <span onClick={() => {
            if (this.state.show === 1) this.setState({ show: 0 });
            else this.setState({ show: 1 });
          }}>{this.props.nm}</span>
          <input type="button" value="x" className="deleteGroup" onClick={this.props.del} />
        </div>
        {this.blockCreate()}
      </div>
    );
  }
}

export default INDir;