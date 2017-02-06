import React from 'react';
import jwt_decode from 'jwt-decode';
import 'isomorphic-fetch';
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

function hashStr(str) {
  if (typeof str !== 'string') return false;
  let rslt = 0;
  const x = str.length;
  for (let i = 0; i < x; i += 1) {
    rslt = ((rslt << 5) - rslt) + (str.charCodeAt(i));
    rslt |= 0;
  }
  return ((rslt < 0) ?(-rslt) :rslt);
}

function getHashSize(estimate) {
  if (estimate < 8) return 7;
  if (estimate < 16) return 13;
  if (estimate < 32) return 31;
  if (estimate < 64) return 61;
  if (estimate < 128) return 127;
  if (estimate < 512) return 509;
  if (estimate < 2048) return 1499;
  if (estimate < 8192) return 4999;
  if (estimate < 32768) return 13999;
  if (estimate < 131072) return 59999;
  if (estimate < 524288) return 100019;
  if (estimate < 2097152) return 300007;
  if (estimate < 8388608) return 900001;
  if (estimate < 33554432) return 1000003;
  if (estimate < 134217728) return 3000017;
  if (estimate < 536870912) return 5000011;
  return 7000003;
}

class INApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockArr: [],
      groupArr: [],
      findArr: [],
      findDirArr: [],
      ftnOn: 0,
      isURL: false,
    };

    this.keptStr = '';
    this.findKey = '';
    this.blockHashKey = new Array();
    this.dirNameHash = new Array();
    this.blockNameHash = new Array();
    this.account = jwt_decode(localStorage.getItem('token')).sub;

    this.imgClass = this.imgClass.bind(this);
    this.modeClick = this.modeClick.bind(this);
    this.inputCreate = this.inputCreate.bind(this);
    this.delBlock = this.delBlock.bind(this);
    this.delGroup = this.delGroup.bind(this);
    this.transBlock = this.transBlock.bind(this);
    this.pushAfterPull = this.pushAfterPull.bind(this);
    this.keyJudge = this.keyJudge.bind(this);
    this.showBlocks = this.showBlocks.bind(this);
    this.showGroups = this.showGroups.bind(this);
  }

  componentDidMount() {
    fetch(`/api/in_app/dirs/${this.account}`)
    .then(res => res.json())
    .then(dataIn => {
      let tmpStr = '';
      const x = dataIn.length;
      const y = getHashSize(x);
      const { groupArr, blockArr } = this.state;
      for (let i = 0; i < y; i += 1) this.dirNameHash.push(new Array());
      for (let i = 0, x = dataIn.length; i < x; i += 1) {
        tmpStr = dataIn[i].nm;
        groupArr.push(
          <INDir
            key={`base group ${i}`}
            hashKey={dataIn[i]._id}
            nm={tmpStr}
            elementArr={dataIn[i].elementArr}
            fetcher={this.transBlock(tmpStr)}
            pushAfterPull={this.pushAfterPull}
            del={this.delGroup(i)}
          />
        );
        this.dirNameHash[hashStr(tmpStr) % y].push(tmpStr);
      }
      fetch(`/api/in_app/objs/${this.account}`)
      .then(res => res.json())
      .then(innerDataIn => {
        let tmpInnerStr = '';
        const xx = innerDataIn.length;
        let zz = xx; for (let i = 0; i < x; i += 1) zz += dataIn[i].elementArr.length;
        const yy = getHashSize(zz);
        for (let i = 0; i < yy; i += 1) this.blockNameHash.push(new Array());
        for (let i = 0; i < x; i += 1) {
          tmpInnerStr = dataIn[i].nm;
          zz = dataIn[i].elementArr;
          for (let j = 0, gg = zz.length; j < gg; j += 1)
            this.blockNameHash[hashStr(zz[j].nm) % yy].push({
              name: zz[j].nm,
              location: `Directory ${tmpInnerStr}`,
              index: 0,
            });
        }

        for (let i = 0; i < xx; i += 1) {
          tmpInnerStr = innerDataIn[i].nm;
          blockArr.push(
            <INObj
              key={`base block ${i}`}
              nm={tmpInnerStr}
              url={innerDataIn[i].url}
              del={this.delBlock(i)}
            />
          );
          this.blockHashKey.push(innerDataIn[i]._id);
          this.blockNameHash[hashStr(tmpInnerStr) % yy].push({
            name: tmpInnerStr,
            location: 'the base',
            index: i,
          });
        }
        this.setState({});
      }).catch(e => console.log('error: objInit went wrong', e));
      this.setState({});
    }).catch(e => console.log('error: dirInit went wrong', e));
  }

  imgClass(index) {
    if (index === this.state.ftnOn) return 'ftnOn';
    return 'ftnOff';
  }

  modeClick(index) {
    if (index !== this.state.ftnOn) {
      this.findKey = '';
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
    return <input type="text" placeholder={holder} onKeyDown={this.keyJudge} />;
  }

  delBlock(index) {
    const { blockArr, findArr } = this.state;
    return (() => {
      const tmpMsg = blockArr[index].props.nm;
      const hashBox = this.blockNameHash[hashStr(tmpMsg) % this.blockNameHash.length];
      const indexOut = hashBox.findIndex(elem => (elem.name === tmpMsg));
      let x = hashBox.length - 1;
      if (indexOut !== x) {
        hashBox[indexOut].name = hashBox[x].name;
        hashBox[indexOut].location = hashBox[x].location;
        hashBox[indexOut].index = hashBox[x].index;
      }
      hashBox.pop();

      x = findArr.length;
      if (x > 0) for (let i = 0; i < x; i += 1) {
        if ((typeof findArr[i] !== 'undefined') &&
            (blockArr[index].props.del === findArr[i].props.del)) { delete findArr[i]; break; }
      }
      fetch(`/api/in_app/obj/${this.blockHashKey[index]}`, { method: 'DELETE' })
      .catch(e => console.log('error: objDel went wrong', e));
      delete blockArr[index];
      this.setState({});
    });
  }

  delGroup(index) {
    const { groupArr, findDirArr } = this.state;
    return (() => {
      const { nm, elementArr } = groupArr[index].props;
      let hashBox = this.dirNameHash[hashStr(nm) % this.dirNameHash.length];
      let indexOut = hashBox.findIndex(elem => (elem === nm));
      let x = hashBox.length - 1;
      if (indexOut !== x) hashBox[indexOut] = hashBox[x];
      hashBox.pop();
      for (let i = 0, y = elementArr.length, str = ''; i < y; i += 1) {
        str = elementArr[i].nm;
        hashBox = this.blockNameHash[hashStr(str) % this.blockNameHash.length];
        indexOut = hashBox.findIndex(elem => (elem.name === str));
        x = hashBox.length - 1;
        if (indexOut !== x) {
          hashBox[indexOut].name = hashBox[x].name;
          hashBox[indexOut].location = hashBox[x].location;
          hashBox[indexOut].index = hashBox[x].index;
        }
        hashBox.pop();
      }

      x = findDirArr.length;
      if (x > 0) for (let i = 0; i < x; i += 1) {
        if ((typeof findDirArr[i] !== 'undefined') &&
            (groupArr[index].props.del === findDirArr[i].props.del)) { delete findDirArr[i]; break; }
      }
      fetch(`/api/in_app/dir/${groupArr[index].props.hashKey}`, { method: 'DELETE' })
      .catch(e => console.log('error: dirDel went wrong', e));
      delete groupArr[index];
      this.setState({});
    });
  }

  transBlock(dirName) {
    const { blockArr } = this.state;
    return (tmpMsg => {
      const hashBox = this.blockNameHash[hashStr(tmpMsg) % this.blockNameHash.length];
      const searchOut = hashBox.find(
        (elem, index, arr) => ((elem.name === tmpMsg) && (elem.location === 'the base'))
      );
      if (typeof searchOut !== 'undefined') {
        const tmpBlock = blockArr[searchOut.index];
        blockArr[searchOut.index].props.del();
        hashBox.push({
          name: tmpMsg,
          location: `Directory ${dirName}`,
          index: 0,
        });
        return tmpBlock;
      }
    });
  }

  pushAfterPull(extrBlock) {
    const { nm, url } = extrBlock;
    const { blockArr, findArr } = this.state;
    const body = JSON.stringify({
      user: this.account,
      nm: nm,
      url: url,
    });
    fetch('/api/in_app/obj', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body,
    }).then(res => res.json())
    .then(dataIn => {
      const id = blockArr.length;
      const hashBox = this.blockNameHash[hashStr(nm) % this.blockNameHash.length];
      const indexOut = hashBox.findIndex(elem => (elem.name === nm));
      hashBox[indexOut].location = 'the base';
      hashBox[indexOut].index = id;

      blockArr.push(
        <INObj
          key={`base block ${id}`}
          nm={nm}
          url={url}
          del={this.delBlock(id)}
        />
      );
      this.blockHashKey.push(dataIn._id);
      if ((this.findKey !== '') && (!diff(this.findKey, nm))) findArr.push(blockArr[id]);
      this.setState({});
    }).catch(e => console.log('error: objPushAfterPull went wrong', e));
  }

  keyJudge(e) {
    const { ftnOn, isURL, blockArr, groupArr, findArr, findDirArr } = this.state;
    if ((ftnOn < 2) && (!isURL)) e.target.value = e.target.value.substring(0, maxLen - 1);
    if (e.key === 'Enter') {
      const tmpMsg = e.target.value.trim();
      e.target.value = '';
      if (tmpMsg === '') return;
      if (ftnOn === 1) {
        const hashBox = this.dirNameHash[hashStr(tmpMsg) % this.dirNameHash.length];
        const searchOut = hashBox.find((elem, index, arr) => (elem === tmpMsg));
        if (typeof searchOut === 'undefined') hashBox.push(tmpMsg);
        else {
          window.alert(`Directory ${tmpMsg} already exists!`);
          return;
        }

        const body = JSON.stringify({
          user: this.account,
          nm: tmpMsg,
        });
        fetch('/api/in_app/dir', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body,
        }).then(res => res.json())
        .then(dataIn => {
          const id = groupArr.length;
          groupArr.push(
            <INDir
              key={`base group ${id}`}
              hashKey={dataIn._id}
              nm={tmpMsg}
              elementArr={[]}
              fetcher={this.transBlock(tmpMsg)}
              pushAfterPull={this.pushAfterPull}
              del={this.delGroup(id)}
            />
          );
          this.setState({});
        }).catch(e => console.log('error: objPush went wrong', e));

        return;
      }
      if (ftnOn === 2) {
        const s = blockArr.length;
        const t = groupArr.length;
        findArr.length = 0;
        findDirArr.length = 0;
        this.findKey = tmpMsg;
        for (let i = 0; i < s; i += 1) {
          if ((typeof blockArr[i] !== 'undefined') &&
              (!diff(tmpMsg, blockArr[i].props.nm))) findArr.push(blockArr[i]);
        }
        for (let i = 0; i < t; i += 1) {
          if ((typeof groupArr[i] !== 'undefined') &&
              (!diff(tmpMsg, groupArr[i].props.nm))) findDirArr.push(groupArr[i]);
        }
        this.setState({});
        return;
      }
      if (isURL) {
        const body = JSON.stringify({
          user: this.account,
          nm: this.keptStr,
          url: tmpMsg,
        });
        fetch('/api/in_app/obj', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body,
        }).then(res => res.json())
        .then(dataIn => {
          const id = blockArr.length;
          blockArr.push(
            <INObj
              key={`base block ${id}`}
              nm={this.keptStr}
              url={tmpMsg}
              del={this.delBlock(id)}
            />
          );
          this.blockHashKey.push(dataIn._id);
          this.blockNameHash[hashStr(this.keptStr) % this.blockNameHash.length].push({
            name: this.keptStr,
            location: 'the base',
            index: id,
          });
          this.setState({});
        }).catch(e => console.log('error: objPush went wrong', e));
      } else {
        const hashBox = this.blockNameHash[hashStr(tmpMsg) % this.blockNameHash.length];
        const searchOut = hashBox.find((elem, index, arr) => (elem.name === tmpMsg));
        if (typeof searchOut !== 'undefined') {
          window.alert(`Bookmark ${tmpMsg} already exists in ${searchOut.location}!`);
          return;
        }
        this.keptStr = tmpMsg;
      }
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
