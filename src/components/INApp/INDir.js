import React from 'react';
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

  delBlock(index) {
    const { elementArr } = this.state;
    return (() => {
      delete elementArr[index];
      this.setState({ show: this.state.show });
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
        elementArr.push(<INObj key={id} nm={nm} url={url} del={this.delBlock(id)} />);
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