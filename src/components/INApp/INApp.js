import React from 'react';
import './INApp.css';
import INDir from './INDir';
import INObj from './INObj';

const maxLen = 16;
const addObjURL = 'https://openclipart.org/image/2400px/svg_to_png/171070/tasto-2-architetto-franc-01-black-border.png';
const addDirURL = 'http://www.pd4pic.com/images/folder-directory-file-system-filesystem-open.png';
const findURL = 'http://pngimg.com/upload/eye_PNG6183.png';

function diff(m, nm) {
  const ml = m.length;
  const nml = nm.length;
  if (ml === 0) return false;
  for (let i = 0; i < nml; i += 1) {
    if (i + ml > nml) return true;
    if (nm.substring(i, i + ml) === m) return false;
  }
  return true;
}

class INApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockArr: [],
      groupArr: [],
      findArr: [],
      findDirArr: [],
      keptStr: '',
      ftnOn: 0,
      isURL: false,
    };
    this.imgClass = this.imgClass.bind(this);
    this.modeClick = this.modeClick.bind(this);
    this.inputCreate = this.inputCreate.bind(this);
    this.delBlock = this.delBlock.bind(this);
    this.delGroup = this.delGroup.bind(this);
    this.transBlock = this.transBlock.bind(this);
    this.keyJudge = this.keyJudge.bind(this);
    this.showBlocks = this.showBlocks.bind(this);
    this.showGroups = this.showGroups.bind(this);
  }

  imgClass(index) {
    if (index === this.state.ftnOn) return 'ftnOn';
    return 'ftnOff';
  }

  modeClick(index) {
    if (index !== this.state.ftnOn) {
      this.state.findArr.length = 0;
      this.state.findDirArr.length = 0;
      this.setState({ ftnOn: index, isURL: false });
    }
  }

  inputCreate() {
    let holder = 'Enter Your ';
    const { ftnOn, isURL } = this.state;
    if (ftnOn === 2) holder += 'Keyword';
    else if (ftnOn === 1) holder += `Folder (len < ${maxLen})`;
    else if (isURL) holder += 'URL';
    else holder += `Tag (len < ${maxLen})`;
    return <input type="text" placeholder={holder} onKeyPress={this.keyJudge} />;
  }

  delBlock(index) {
    const { blockArr, findArr } = this.state;
    return (() => {
      const x = findArr.length;
      if (x > 0) for (let i = 0; i < x; i += 1) {
        if ((typeof findArr[i] !== 'undefined') &&
            (blockArr[index].props.del === findArr[i].props.del)) { delete findArr[i]; break; }
      }
      delete blockArr[index];
      this.setState({ isURL: this.state.isURL });
    });
  }

  delGroup(index) {
    const { groupArr, findDirArr } = this.state;
    return (() => {
      const x = findDirArr.length;
      if (x > 0) for (let i = 0; i < x; i += 1) {
        if ((typeof findDirArr[i] !== 'undefined') &&
            (groupArr[index].props.del === findDirArr[i].props.del)) { delete findDirArr[i]; break; }
      }
      delete groupArr[index];
      this.setState({ isURL: this.state.isURL });
    });
  }

  transBlock(tmpMsg) {
    const { blockArr } = this.state;
    const s = blockArr.length;
    for (let i = 0; i < s; i += 1) {
      if ((typeof blockArr[i] !== 'undefined') && (tmpMsg === blockArr[i].props.nm)) {
        const tmpBlock = blockArr[i];
        blockArr[i].props.del();
        return tmpBlock;
      }
    }
  }

  keyJudge(e) {
    const { ftnOn, isURL, blockArr, groupArr, findArr, findDirArr } = this.state;
    if ((ftnOn < 2) && (!isURL)) e.target.value = e.target.value.substring(0, maxLen - 1);
    if (e.key === 'Enter') {
      const tmpMsg = e.target.value.trim();
      e.target.value = '';
      if (tmpMsg === '') return;
      if (ftnOn === 1) {
        const id = groupArr.length;
        groupArr.push(<INDir key={id} nm={tmpMsg} fetcher={this.transBlock} del={this.delGroup(id)} />);
        this.setState({ isURL: isURL });
        return;
      }
      if (ftnOn === 2) {
        const s = blockArr.length;
        const t = groupArr.length;
        findArr.length = 0;
        findDirArr.length = 0;
        for (let i = 0; i < s; i += 1) {
          if ((typeof blockArr[i] !== 'undefined') &&
              (!diff(tmpMsg, blockArr[i].props.nm))) findArr.push(blockArr[i]);
        }
        for (let i = 0; i < t; i += 1) {
          if ((typeof groupArr[i] !== 'undefined') &&
              (!diff(tmpMsg, groupArr[i].props.nm))) findDirArr.push(groupArr[i]);
        }
        this.setState({ isURL: isURL });
        return;
      }
      if (isURL) {
        const id = blockArr.length;
        blockArr.push(<INObj key={id} nm={this.state.keptStr} url={tmpMsg} del={this.delBlock(id)} />);
      } else this.state.keptStr = tmpMsg;
      this.setState({ isURL: (isURL === false) });
    }
  }

  showBlocks() {
    const { blockArr, findArr, ftnOn } = this.state;
    if (ftnOn === 2) return findArr;
    return blockArr;
  }

  showGroups() {
    const { groupArr, findDirArr, ftnOn } = this.state;
    if (ftnOn === 2) return findDirArr;
    return groupArr;
  }

  render() {
    return (
      <div>
      <div className="in-app">
        <div className="in-bar">
          <div className={this.imgClass(0)} onClick={() => { this.modeClick(0); }}>
            <img src={addObjURL} width="90 px" height="90 px" />
          </div>
          <div className={this.imgClass(1)} onClick={() => { this.modeClick(1); }}>
            <img src={addDirURL} width="90 px" height="90 px" />
          </div>
          <div className={this.imgClass(2)} onClick={() => { this.modeClick(2); }}>
            <img src={findURL} width="90 px" height="90 px" />
          </div>
          {this.inputCreate()}
        </div>
        <div className="in-groups">
          {this.showGroups()}
        </div>
        <div className="in-blocks">
          {this.showBlocks()}
        </div>
      </div>
      </div>
    );
  }
}

export default INApp;
