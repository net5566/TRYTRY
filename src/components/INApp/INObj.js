import React from 'react';
import './INObj.css';

const INObj = ({ nm, url, del }) => (
  <div className="obj-link">
    <a href={'http://' + url} target="_blank">{nm}</a>
    <input type="button" value="X" className="delete" onClick={del} />
  </div>
);

export default INObj;
